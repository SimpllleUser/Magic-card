import { authServiceApi } from '@/features/auth/api';
import { User } from '@/features/auth/model/types';
import { Nullable } from 'base-form/src/core/types/common';
import { defineStore } from 'pinia';



export const useAuthStore = defineStore('auth', () => {

  const user = ref<Nullable<User>>(null)

  const initUserData = async () => {
    user.value = await authServiceApi.getUser()
  }

  const singOut = async () => {
    await authServiceApi.logoutUser()
    user.value = null
  }

  const signIn = async () => {
    authServiceApi.loginWithGoogle()
  }

  const isAuthenticated = computed(() => !!user.value?.$id)
  const userName = computed(() => user.value?.name)


  return {
    initUserData,
    singOut,
    signIn,
    isAuthenticated,
    userName,
  };
});
