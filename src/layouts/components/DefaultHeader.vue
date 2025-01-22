<script setup lang="ts">
  import { Colors, Themes } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useStorage } from '@vueuse/core';
  import { useTheme } from 'vuetify';
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();

  const themeConfig = useTheme();
  const theme = useStorage('theme', themeConfig.global.name.value);

  themeConfig.global.name.value = theme.value;

  const toggleTheme = () => {
    const isDarkMode = themeConfig.global.current.value.dark;
    theme.value = isDarkMode ? Themes.Light : Themes.Dark;
    themeConfig.global.name.value = theme.value;
  };

  const themeIcon = computed(() => (theme.value === Themes.Light ? Icons.Moon : Icons.Sun));

  const goToBack = () => {
    router.go(-1);
  };

  const canGoToBack = computed(() => route.name !== 'Home');
</script>

<template>
  <v-app-bar :color="Colors.Primary" :elevation="1">
    <template #prepend>
      <VBtn v-if="canGoToBack" class="ml-4" :icon="Icons.Back" @click="goToBack" />
    </template>

    <v-app-bar-title v-if="route.meta?.title">
      {{ route.meta?.title }}
    </v-app-bar-title>

    <template #append>
      <VBtn :icon="themeIcon" @click="toggleTheme" />
    </template>
  </v-app-bar>
</template>
