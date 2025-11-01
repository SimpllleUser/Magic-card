import { Models, OAuthProvider } from 'appwrite';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { AuthService } from '../api';

export const useAuthStore = defineStore('auth', () => {
  const authService = new AuthService({
    redirect: {
      success: `${window.location.origin}/`,
      failure: `${window.location.origin}/login`
    }
  });

  const user = useLocalStorage('user', null as null | Models.User<Models.Preferences>);
  const isAuth = computed(() => !!user.value);

  async function login() {
    const error = await authService.login();
    if (error) {
      throw error;
    }
  }

  const initUser = async () => {
    user.value = await authService.getUser();
  };

  async function logout() {
    await authService.logout();
    user.value = null;
  }

  const getSession = async () => {
    const session = await authService.getSession('current');
    return session;
  };

  return {
    user,
    isAuth,
    login,
    logout,
    initUser,
    getSession
  };
});
