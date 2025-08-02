import { defineStore } from 'pinia';
import { RemovableRef, useStorage } from '@vueuse/core';
import { onMounted } from 'vue';
import { googleTokenLogin } from 'vue3-google-login';

interface ILoginData {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

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

  const logout = () => {
    try {
      token.value = '';
      user.value = '';
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const clearAuth = () => {
    logout();
  };

  const login = async () => {
    try {
      const res = await googleTokenLogin({
        clientId: import.meta.env.VITE_GOOGLE_TOKEN,
        scope: 'email profile openid',
        prompt: 'select_account',
        ux_mode: 'popup'
      });

      token.value = res.access_token;

      const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
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
    }
  };

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

export type AuthStore = ReturnType<typeof useAuthStore>;
