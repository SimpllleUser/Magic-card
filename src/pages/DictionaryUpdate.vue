<script setup lang="ts">
  import { useDictionaryStore } from '@/stores/dictionary';
  import { useRoute } from 'vue-router';
  import TopicForm from '@/features/dictionary/ui/DictionaryForm.vue';

  const route = useRoute();

  const topicsStore = useDictionaryStore();

  const topic = computed(() => topicsStore.getById(route.params?.id));
</script>

<template>
  <div class="pa-4">
    <TopicForm :form-data="topic" />
  </div>
</template>

<style scoped></style>
