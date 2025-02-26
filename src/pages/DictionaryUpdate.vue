<script setup lang="ts">
  import { useDictionaryStore } from '@/stores/dictionary';
  import { useRoute } from 'vue-router';
  import DictionaryForm from '@/features/dictionary/ui/DictionaryForm.vue';

  const route = useRoute();

  const dictionaryStore = useDictionaryStore();

  const dictionary = computed(() => dictionaryStore.getById(route.params?.id));
</script>

<template>
  <div class="pa-4">
    <DictionaryForm :form-data="dictionary" />
  </div>
</template>

<style scoped></style>
