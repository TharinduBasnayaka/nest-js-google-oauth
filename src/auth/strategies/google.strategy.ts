/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import googleOauthConfig from '../config/google-oauth.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleOauthConfiguration: ConfigType<typeof googleOauthConfig>,
  ) {
    super({
      clientID: googleOauthConfiguration.clientId || '',
      clientSecret: googleOauthConfiguration.clientSecret || '',
      callbackURL: googleOauthConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });

    console.log('Client ID:', googleOauthConfiguration.clientId);
    console.log('Client Secret:', googleOauthConfiguration.clientSecret);
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = {
      userId: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatarUrl: profile.photos[0].value,
    };
    console.log('User:', user);
    console.log(`google access token ${accessToken}`);
    console.log(`google refresh token ${refreshToken}`);
    console.log(profile);
    return user;
  }
}
