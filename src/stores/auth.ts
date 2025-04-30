import { authServiceApi } from '@/features/auth/api';
import { AuthUser } from '@/features/auth/model/types';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const user = useStorage<AuthUser | Object>('user', {});

  const initUserData = async () => {
    user.value = await authServiceApi.getUser(() => {
      user.value = {};
    });
  };

  const singOut = async () => {
    await authServiceApi.logoutUser();
    user.value = {};
  };

  const signIn = async () => {
    authServiceApi.loginWithGoogle();
  };

  const isAuthenticated = computed(() => !!user.value?.$id);
  const userName = computed(() => user.value?.name || '');

  return {
    user,
    initUserData,
    singOut,
    signIn,
    isAuthenticated,
    userName
  };
});

export type AuthStore = ReturnType<typeof useAuthStore>;
