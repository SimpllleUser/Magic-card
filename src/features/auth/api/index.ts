import { account } from '@/shared/api';
import { Account, OAuthProvider } from 'appwrite';

interface AuthServiceData {
  provider?: OAuthProvider;
  redirect: {
    success: string;
    failure: string;
  };
}
export class AuthService {
  service: Account = account;
  provider = OAuthProvider.Google;
  redirect: { success: string; failure: string };
  constructor(data: AuthServiceData) {
    if (data.provider) this.provider = data.provider;
    this.redirect = data.redirect;
  }

  getUser() {
    return this.service.get();
  }

  async login() {
    try {
      await this.service.createOAuth2Session(this.provider, this.redirect.success, this.redirect.failure);
    } catch (error) {
      return error;
    }
  }

  getSession(sessionId: string) {
    return this.service.getSession(sessionId);
  }

  logout() {
    return this.service.deleteSession('current');
  }
}
