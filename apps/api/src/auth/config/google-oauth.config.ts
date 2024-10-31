import { registerAs } from '@nestjs/config';

export default registerAs('googleOAuth', () => ({
  clientID: process.env.GOOGLE_CLIENT_ID_OAUTH,
  clientSecret: process.env.GOOGLE_SECRET_KEY_OAUTH,
  callbackURL: process.env.GOOGLE_CALLBACK_URL_OAUTH
}));
