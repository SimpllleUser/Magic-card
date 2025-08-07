import { GOOGLE_LOGIN_PARAMS, GOOGLE_TOKEN_INFO_URL, USER_INFO_URL } from '@/features/auth/model/constants';
import { googleTokenLogin } from 'vue3-google-login';
import { IUser, IUserInfoResponse } from '@/features/auth/model/types';

export class AuthApi {
  async fetchUserDataByToken(token: string): Promise<any> {
    const response = await fetch(USER_INFO_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async checkUserToken(token: string): Promise<boolean> {
    if (!token) return false;

    try {
      await this.fetchUserDataByToken(token);
      return true;
    } catch (e) {
      console.error('Token validation failed:', e);
      return false;
    }
  }

  async loginByGoogle(token: string) {
    if (token && (await this.checkUserToken(token))) {
      return;
    }

    const googleLoginResponse = await googleTokenLogin(GOOGLE_LOGIN_PARAMS);

    const responseUser = await this.fetchUserDataByToken(googleLoginResponse.access_token);
    const userData = this.toUserData(responseUser);

    return {
      user: userData,
      token: googleLoginResponse.access_token
    };
  }

  toUserData(payload: IUserInfoResponse): IUser {
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      givenName: payload.given_name,
      familyName: payload.family_name,
      emailVerified: payload.email_verified
    };
  }

  async validateToken(token: string) {
    if (!token) return false;

    try {
      const response = await fetch(`${GOOGLE_TOKEN_INFO_URL}${token}`);
      return response.ok;
    } catch {
      return false;
    }
  }
}
