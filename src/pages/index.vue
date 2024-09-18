<script lang="ts" setup>
  import TopicCard from '@/pages/Topics/components/TopicCard.vue';
  import { useTopicsStore } from '@/pages/Topics/store/topics';

  const topicsStore = useTopicsStore();
</script>

<template>
  <div>List of card Topics</div>
  <div>
    <VRow class="pa-4">
      <VCol v-for="topic in topicsStore.items" :key="topic.id" cols="4">
        <TopicCard :topic="topic" @remove="topicsStore.remove" />
      </VCol>
    </VRow>
  </div>
</template>
