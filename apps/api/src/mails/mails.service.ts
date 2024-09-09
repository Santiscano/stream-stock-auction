import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async forgotPassword(userName: string, email: string, token: string) {
    try {
      const resEmail = await this.mailerService.sendMail({
        to: email,
        subject: 'Forgot Password',
        template: './forgot-password',
        context: {
          name: userName,
          url: `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`,
        }
      });
  
      const response = resEmail.accepted.length === 0 ? false : true;
      return response;
    } catch (error) {
      console.log('error mailsService: ', error);
      throw new InternalServerErrorException('Error sending email');
    }
  }

  async welcomeUser(userName: string, email: string, token: string) {
    try {
      const resEmail = await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome - Active Account',
        template: './welcome',
        context: {
          name: userName,
          url: `${this.configService.get('HOST')}${this.configService.get('PORT')}/api/auth/active-account?token=${token}`,
        }
      });
  
      const response = resEmail.accepted.length === 0 ? false : true;
      return response;
    } catch (error) {
      console.log('error mailsService: ', error);
      throw new InternalServerErrorException('Error sending email');
    }
  }
}
