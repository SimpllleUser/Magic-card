import { account, OAuthProvider } from './index';

export const loginWithGoogle = async () => {
  try {
    return await account.createOAuth2Session(OAuthProvider.Google, 'http://localhost:3000')
  } catch (error) {
    console.error(error)
  }
}

export const logoutUser = async () => {
  try {
    return await account.deleteSession('current')
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async () => {
  try {
    return await account.get()
  } catch (error) {
    console.error(error)
  }
}

