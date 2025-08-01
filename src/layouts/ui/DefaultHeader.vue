<script setup lang="ts">
  import { Colors, Themes } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useStorage } from '@vueuse/core';
  import { useTheme } from 'vuetify';
  import { computed } from 'vue';
  import Breadcrumbs from '@/layouts/ui/Breadcrumbs.vue';
  import AuthBlock from '@/features/auth/ui/AuthBlock.vue';
  import { GoogleLogin } from 'vue3-google-login';
  import { useAuth } from '@/layouts/ui/useAuth';

  const { user, isAuthenticated, handleGoogleLogin, logout, refreshUserData, testApiRequest } = useAuth();

  const themeConfig = useTheme();
  const theme = useStorage('theme', themeConfig.global.name.value);

  themeConfig.global.name.value = theme.value;

  const toggleTheme = () => {
    const isDarkMode = themeConfig.global.current.value.dark;
    theme.value = isDarkMode ? Themes.Light : Themes.Dark;
    themeConfig.global.name.value = theme.value;
  };

  const themeIcon = computed(() => (theme.value === Themes.Light ? Icons.Moon : Icons.Sun));
</script>

<template>
  <div
    v-if="isAuthenticated"
    class="user-info"
  >
    <img
      :alt="user.name"
      class="avatar"
      :src="user.picture"
    />
    <div class="user-details">
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Ім'я:</strong> {{ user.givenName }}</p>
      <p><strong>Прізвище:</strong> {{ user.familyName }}</p>
    </div>
  </div>
  <VToolbar
    class="header"
    color="surface-light"
    :elevation="1"
  >
    <v-app-bar-title>
      <div class="title-wrapper">
        <Breadcrumbs />
      </div>
    </v-app-bar-title>

    <template #append>
      <VBtn
        :icon="themeIcon"
        @click="toggleTheme"
      />
      <VBtn
        class="btn btn-secondary"
        @click="refreshUserData"
      >
        Оновити дані
      </VBtn>
      <VBtn
        class="btn btn-primary"
        @click="testApiRequest"
      >
        Тестовий API запит
      </VBtn>
      <VBtn
        v-if="isAuthenticated"
        class="btn btn-danger"
        :color="Colors.Error"
        @click="logout"
      >
        Вийти
      </VBtn>
      <GoogleLogin
        v-if="!isAuthenticated"
        :callback="handleGoogleLogin"
        prompt
      />
      <AuthBlock class="ml-4" />
    </template>
  </VToolbar>
</template>
<style lang="scss" scoped>
  .header {
    :deep(.v-toolbar__content) {
      max-width: 1280px;
      margin: 0 auto;
    }
  }
  .title-wrapper {
    display: flex;
    align-items: center;
  }

  .title {
    position: absolute;
    transition: transform 0.3s ease;
    transform: tran slateX(0);
  }
  .with-btn-back {
    transform: translateX(50px);
  }
</style>
