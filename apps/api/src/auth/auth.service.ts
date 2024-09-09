import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

import { CreateUserDto, LoginUserDto, ResetPasswordDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces';
import { ForgotPasswordDto } from './dto';
import { MailsService } from 'src/mails/mails.service';
import { IncomingHttpHeaders } from 'http';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;

      // enviar email
      const token = this.jwtService.sign({ email: user.email, fullName: user.fullName }, { expiresIn: '24h' });
      const resEmail = await this.mailService.welcomeUser(user.fullName, user.email, token);
      if (!resEmail) throw new BadRequestException(['Error sending email']);

      return {
        ...user,
        token: this.getJwtToken({
          fullName: user.fullName,
          email: user.email,
        }),
        message: 'User created successfully, please check your email to activate your account',
      };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async signin(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email }
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!compareSync(password, user.password)) throw new UnauthorizedException('Invalid credentials Password');

    delete user.password;

    return {
      ...user, // se podria omitir user porque en el token ya estan los datos
      token: this.getJwtToken({
        fullName: user.fullName,
        email: user.email,
      }),
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    
    const user = await this.userRepository.findOne({
      where: { email: email.trim() }
    });

    if (!user) return { message: 'If the email exists, we send an email to recover the password', email };

    // enviar email
    const token = this.jwtService.sign({ email: user.email, fullName: user.fullName }, { expiresIn: '5m' });
    const res = await this.mailService.forgotPassword(user.fullName, user.email, token);
    if (!res) throw new BadRequestException(['Error sending email']);

    return { message: 'If the email exists, we send an email to recover the password.' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto, headers: IncomingHttpHeaders) {
    try {
      const { email, newPassword } = resetPasswordDto;
      
      const token = headers.authorization.split(' ')[1];
      const { email: tokenEmail } = this.jwtService.verify(token, { secret: this.configService.get('SECRET_KEY') });

      if (email !== tokenEmail) throw new UnauthorizedException('Invalid email');

      const user = await this.userRepository.findOne({
        where: { email: tokenEmail }
      });

      if (!user) throw new NotFoundException('User not found');

      user.password = hashSync(newPassword, 10);
      await this.userRepository.save(user);

      return { message: 'Password updated successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async activeAccount(token: string, res: Response) {
    try {
      const { email } = this.jwtService.verify(token, { secret: this.configService.get('SECRET_KEY') });

      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) throw new NotFoundException('User not found');

      user.isActive = true;
      await this.userRepository.save(user);

      // res.setHeader('X-Redirect-URL', `${this.configService.get('FRONTEND_URL')}`);
      return res.redirect(302, `${this.configService.get('FRONTEND_URL')}`);
    } catch (error) {
      return res.status(400).json({ message: 'Error activating account' });
    }
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({
        fullName: user.fullName,
        email: user.email,
      }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleDBError(error: any): never {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new BadRequestException('Email already exists');
    }

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }

}
