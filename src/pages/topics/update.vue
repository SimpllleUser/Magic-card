<script setup lang="ts">
  import { useTopicsStore } from '@/features/Topics/store/topics';
  import { useRoute } from 'vue-router';
  import TopicForm from '@/features/Topics/TopicForm/index.vue';

  const route = useRoute();

  const topicsStore = useTopicsStore();

  const topic = computed(() => topicsStore.getById(route.params?.id));
</script>

<template>
  <div>
    <TopicForm :form-data="topic" />
  </div>
</template>

<style scoped></style>
