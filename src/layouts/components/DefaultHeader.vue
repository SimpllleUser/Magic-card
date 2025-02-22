<script setup lang="ts">
  import { Colors, Themes } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useStorage } from '@vueuse/core';
  import { useTheme } from 'vuetify';
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';

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
  <VToolbar :color="Colors.Primary" :elevation="1">
    <v-app-bar-title>
      <div class="title-wrapper">
        <AnimationFade>
          <VBtn v-if="canGoToBack" :icon="Icons.Back" @click="goToBack" />
        </AnimationFade>
        <div class="title" :class="{ 'with-btn-back': canGoToBack }">
          {{ route.meta?.title }}
        </div>
      </div>
    </v-app-bar-title>

    <template #append>
      <VBtn :icon="themeIcon" @click="toggleTheme" />
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
