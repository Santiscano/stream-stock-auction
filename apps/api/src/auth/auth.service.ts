import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { compareSync, hashSync } from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
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

      return {
        ...user,
        token: this.getJwtToken({
          fullName: user.fullName,
          email: user.email,
        }),
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

    console.log('user services', user);

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
