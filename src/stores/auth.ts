import { defineStore } from 'pinia';
import { RemovableRef, useStorage } from '@vueuse/core';
import { computed, readonly, ref } from 'vue';
import { googleTokenLogin } from 'vue3-google-login';

interface IUser {
  id?: string;
  email: string;
  name: string;
  picture: string;
  givenName: string;
  familyName: string;
  emailVerified: boolean;
}

interface UserInfoResponse {
  sub: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  email_verified: boolean;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

const GOOGLE_LOGIN_PARAMS = {
  client_id: import.meta.env.VITE_GOOGLE_TOKEN,
  scope: 'email profile openid',
  prompt: 'select_account',
  ux_mode: 'popup'
};

export const useAuthStore = defineStore('auth', () => {
  const user: RemovableRef<IUser> = useStorage(USER_KEY, { id: '' });
  const token = useStorage<string>(TOKEN_KEY, null);
  const userData = computed((): IUser => user.value);
  const isAuthenticated = computed(() => !!token.value?.length && !!userData.value?.id);
  const isLoading = ref(false);

  const fetchWithToken = async (url: string, token: string): Promise<any> => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const mapUserInfoToIUser = (payload: UserInfoResponse): IUser => ({
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    givenName: payload.given_name,
    familyName: payload.family_name,
    emailVerified: payload.email_verified
  });

  const checkTokenValidity = async (): Promise<boolean> => {
    if (!token.value) return false;

    try {
      await fetchWithToken(USER_INFO_URL, token.value);
      return true;
    } catch (e) {
      console.error('Token validation failed:', e);
      return false;
    }
  };

  const login = async () => {
    isLoading.value = true;
    try {
      if (token.value && (await checkTokenValidity())) {
        return;
      }

      const res = await googleTokenLogin(GOOGLE_LOGIN_PARAMS);

      token.value = res.access_token;

      const payload = await fetchWithToken(USER_INFO_URL, res.access_token);
      const userData = mapUserInfoToIUser(payload);

      if (userData) {
        user.value = userData;
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (e) {
      console.error('Failed to authenticate', e);
      clearAuth();
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    try {
      token.value = '';
      user.value = { id: '' };
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const validateToken = async () => {
    if (!token.value) return false;

    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token.value}`);
      return response.ok;
    } catch {
      return false;
    }
  };

  onMounted(async () => {
    const isOk = await validateToken();
    if (!isOk) {
      clearAuth();
    }
  });

  const clearAuth = () => {
    logout();
  };

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    isLoading: readonly(isLoading),
    userData,
    logout,
    clearAuth,
    login,
    checkTokenValidity
  };
});

export type AuthStore = ReturnType<typeof useAuthStore>;
