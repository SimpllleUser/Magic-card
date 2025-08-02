<script setup lang="ts">
  import { useToggleTheme } from '@/shared/use/toggleTheme';

  const { themeIcon, toggle } = useToggleTheme();
</script>

<template>
  <VBtn
    :icon="themeIcon"
    @click="toggle"
  />
</template>
