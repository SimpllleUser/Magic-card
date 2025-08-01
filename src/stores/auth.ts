import { defineStore } from 'pinia';
import { RemovableRef, useStorage } from '@vueuse/core';
import { onMounted } from 'vue';

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
  const error = ref(null);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  };

  const isTokenValid = (tokenPayload) => {
    if (!tokenPayload) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    return tokenPayload.exp > currentTime;
  };

  const saveAuthData = (authToken: string, userData: IUser) => {
    try {
      token.value = authToken;
      user.value = userData;
    } catch (e) {
      console.error('Error saving auth data:', e);
      error.value = 'Помилка збереження даних авторизації';
    }
  };

  const loadSavedAuth = () => {
    try {
      if (token.value && user.value?.id) {
        const tokenPayload = parseJwt(token.value);
        if (isTokenValid(tokenPayload)) {
          return true;
        } else {
          clearAuth();
          return false;
        }
      }
      return false;
    } catch (e) {
      console.error('Error loading saved auth:', e);
      clearAuth();
      return false;
    }
  };

  const handleGoogleLogin = async (response: ILoginData) => {
    try {
      isLoading.value = true;

      const credential = response.credential;
      const payload = parseJwt(credential);

      if (!payload) {
        throw new Error('Не вдалося розпарсити токен');
      }

      const userData = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        givenName: payload.given_name,
        familyName: payload.family_name,
        emailVerified: payload.email_verified
      };
      saveAuthData(credential, userData);

      return userData;
    } catch (e) {
      error.value = e.message || 'Помилка авторизації';
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

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

  const getAuthHeaders = () => {
    if (!token.value) return {};

    return {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    };
  };

  const refreshUserData = async () => {
    try {
      if (!isAuthenticated.value) return null;

      return user.value;
    } catch (e) {
      console.error('Error refreshing user data:', e);
      return null;
    }
  };

  onMounted(async () => {
    loadSavedAuth();
  });

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    isLoading: readonly(isLoading),
    userData,
    handleGoogleLogin,
    logout,
    clearAuth,
    getAuthHeaders,
    refreshUserData,
    loadSavedAuth
  };
});

export type AuthStore = ReturnType<typeof useAuthStore>;
