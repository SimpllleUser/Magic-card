import { defineStore } from 'pinia';
import { RemovableRef, useStorage } from '@vueuse/core';
import { computed, readonly, ref } from 'vue';
import { IUser } from '@/features/auth/model/types';
import { DEFAULT_USER_DATA, TOKEN_KEY, USER_KEY } from '@/features/auth/model/constants';
import { AuthApi } from '@/features/auth/api';

export const useAuthStore = defineStore('auth', () => {
  const authApi = new AuthApi();

  const user: RemovableRef<IUser> = useStorage(USER_KEY, { ...DEFAULT_USER_DATA });
  const token = useStorage<string>(TOKEN_KEY, null);
  const userData = computed((): IUser => user.value);
  const isAuthenticated = computed(() => !!token.value?.length && !!userData.value?.id);
  const isLoading = ref(false);

  const setToken = (value = '') => {
    token.value = value;
  };

  const setUser = (value: IUser) => {
    user.value = value;
  };

  const login = async () => {
    isLoading.value = true;
    try {
      const authData = await authApi.loginByGoogle(token.value);

      if (authData?.token && authData?.user) {
        setToken(authData.token);
        setUser(authData.user);
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
      setToken();
      setUser({ ...DEFAULT_USER_DATA });
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  onMounted(async () => {
    const isValid = await authApi.validateToken(token.value);
    if (!isValid) {
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
  };
});

export type AuthStore = ReturnType<typeof useAuthStore>;
