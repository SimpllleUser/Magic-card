import { account, OAuthProvider } from '../../../shared/api/index';
import { User } from '../model/types';


 class AuthServiceApi {

  private redirectUrl: string = '/'

  constructor(redirectUrl: string) {
    console.log(redirectUrl)
    this.redirectUrl = redirectUrl
  }

  public async loginWithGoogle() {
    try {
       await account.createOAuth2Session(OAuthProvider.Google, this.redirectUrl)
    } catch (error) {
      this.handleError(error)
    }
  }

  public async logoutUser() {
    try {
      return await account.deleteSession('current')
    } catch (error) {
      this.handleError(error)
    }
  }

  public async getUser(): Promise<User | null> {
    try {
      return await account.get() as User
    } catch (error) {
      this.handleError(error)
      return null
    }
  }

  private handleError(error: any) {
    console.error(error)
  }
}

export const authServiceApi = new AuthServiceApi(window.location.origin)
