import { authServiceApi } from '@/features/auth/api';
import { User } from '@/features/auth/model/types';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'


export const useAuthStore = defineStore('auth', () => {

  const user = useStorage<User | Object>('user', {})


  const initUserData = async () => {
    user.value = await authServiceApi.getUser(() => {
      user.value = {}
    })
  }

  const singOut = async () => {
    await authServiceApi.logoutUser()
    user.value = {}
  }

  const signIn = async () => {
    authServiceApi.loginWithGoogle()
  }

  const isAuthenticated = computed(() => !!user.value?.$id)
  const userName = computed(() => user.value?.name || '')


  return {
    user,
    initUserData,
    singOut,
    signIn,
    isAuthenticated,
    userName,
  };
});
