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

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const useAuthStore = defineStore('auth', () => {
  const user: RemovableRef<IUser> = useStorage(USER_KEY, { id: '' });
  const token = useStorage<string>(TOKEN_KEY, null);
  const userData = computed((): IUser => user.value);
  const isAuthenticated = computed(() => !!token.value?.length && !!userData.value?.id);
  const isLoading = ref(false);

  const USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

  const getUserData = async () => {
    return googleTokenLogin({
      clientId: import.meta.env.VITE_GOOGLE_TOKEN,
      scope: 'email profile openid',
      prompt: 'select_account',
      ux_mode: 'popup'
    });
  };

  const checkTokenValidity = async (): Promise<boolean> => {
    if (!token.value) return false;

    try {
      const response = await getUserData();

      return response.ok;
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

      const res = await getUserData();

      token.value = res.access_token;

      const userResponse = await fetch(USER_INFO_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${res.access_token}`
        }
      });

      if (!userResponse.ok) {
        throw new Error(`HTTP error! status: ${userResponse.status}`);
      }

      const payload = await userResponse.json();
      const userData = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        givenName: payload.given_name,
        familyName: payload.family_name,
        emailVerified: payload.email_verified
      };

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
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const clearAuth = () => {
    logout();
  };

  onMounted(async () => {
    if (token.value && !(await checkTokenValidity())) {
      clearAuth();
    }
  });

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    isLoading: readonly(isLoading),
    userData,
    logout,
    clearAuth,
    login
  };
});
