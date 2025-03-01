<script setup lang="ts">
  import { Themes } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useStorage } from '@vueuse/core';
  import { useTheme } from 'vuetify';
  import { computed } from 'vue';
  import Breadcrumbs from '@/layouts/ui/Breadcrumbs.vue';
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
  <VToolbar
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
    </template>
  </VToolbar>
</template>
<style lang="scss" scoped>
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
