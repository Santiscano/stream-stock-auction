
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';

import { Strategy } from 'passport-google-oauth20';
import { Repository } from 'typeorm';

import googleOauthConfig from '../config/google-oauth.config';
import { AuthService } from '../auth.service';
import { Role } from '../entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    @Inject(googleOauthConfig.KEY) private googleConfig: ConfigType<typeof googleOauthConfig>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      // passReqToCallback: true,
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user: any, info?: any) => void,
  ): Promise<any> {

    const { name, email, email_verified, picture } = profile._json;
    if (!email_verified) done('Email not verified', false);

    const roleEntity = await this.roleRepository.findOne({ where: { id_role: 5 } });

    const user = await this.authService.validateGoogleUser({ 
      email, 
      fullName: name,
      password: "",
      role: roleEntity,
      avatarUrl: picture,
    });

    if (!user) done(new UnauthorizedException('Invalid credentials'), false);

    done(null, user);
  }
}
