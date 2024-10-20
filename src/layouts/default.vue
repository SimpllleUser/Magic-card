<script lang="ts" setup>
  import { Themes } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useTheme } from 'vuetify';
  const route = useRoute();

  const theme = useTheme();

  const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? Themes.Light : Themes.Dark;
  };

  const themeIcon = computed(() => (theme.global.name.value === Themes.Light ? Icons.Moon : Icons.Sun));
</script>

<template>
  <v-app>
    <v-app-bar :elevation="1">
      <template #prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title v-if="route.meta?.title">{{ route.meta?.title }}</v-app-bar-title>
      <template #append>
        <VBtn :icon="themeIcon" @click="toggleTheme" />
      </template>
    </v-app-bar>
    <v-main class="px-4 mt-4">
      <!-- TODO add brad cramp -->
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>
