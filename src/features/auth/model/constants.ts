export const TOKEN_KEY = 'auth_token';
export const USER_KEY = 'auth_user';
export const USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';
export const GOOGLE_LOGIN_PARAMS = {
  client_id: import.meta.env.VITE_GOOGLE_TOKEN,
  scope: 'email profile openid',
  prompt: 'select_account',
  ux_mode: 'popup'
};
export const DEFAULT_USER_DATA = {
  email: '',
  name: '',
  picture: '',
  givenName: '',
  familyName: '',
  emailVerified: false
};

export const GOOGLE_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
