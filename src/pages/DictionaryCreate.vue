<script setup lang="ts">
  import { useSessionStorage } from '@vueuse/core';
  import DictionaryForm from '@/features/dictionary/ui/DictionaryForm.vue';

  const data = useSessionStorage('dictionaryCopy', {});

  onUnmounted(() => {
    sessionStorage.removeItem('dictionaryCopy');
  });
</script>

<template>
  <div class="pa-4">
    <DictionaryForm :form-data="{...data}" />
  </div>
</template>

<style scoped></style>
