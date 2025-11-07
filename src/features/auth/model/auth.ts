import { Models } from 'appwrite';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { AuthService } from '../api';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const authService = new AuthService({
    redirect: {
      success: `${window.location.origin}/`,
      failure: `${window.location.origin}/login`
    }
  });

  const userData = useLocalStorage('user', {} as Models.User<Models.Preferences>);
  const user = computed(() => userData.value);
  const isAuth = computed(() => !!user.value.$id);

  const resetUserData = () => {
    userData.value = null;
    router.push({ name: 'HomePage' });
  };

  async function login() {
    const error = await authService.login();
    if (error) {
      throw error;
    }
  }

  const initUser = async () => {
    try {
      userData.value = await authService.getUser();
    } catch (error) {
      resetUserData();
    }
  };

  async function logout() {
    await authService.logout();
    userData.value = null;
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
