<script setup lang="ts">
  import { useSessionStorage } from '@vueuse/core';
  import { DictionaryForm } from '@/features/dictionary';
  import { useBreakPointsApp } from '@/shared/use/useBreakPointsApp';

  const data = useSessionStorage('dictionaryCopy', {});

  onUnmounted(() => {
    sessionStorage.removeItem('dictionaryCopy');
  });

  const { isMobile } = useBreakPointsApp();
</script>

<template>
  <div :class="{ 'pa-4': !isMobile }">
    <DictionaryForm :form-data="data" />
  </div>
</template>

<style scoped></style>
