<script lang="ts" setup>
  import TopicCard from '@/features/Topics/TopicCard/index.vue';
  import { useTopicsStore } from '@/features/Topics/store/topics';
  import { Topic } from '@/core/models/Topic';
  import { Colors, Sizes, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';

  const router = useRouter();

  const topicsStore = useTopicsStore();

  const updateTopic = (topic: Topic | Record<string, unknown>) => {
    router.push({ name: 'TopicUpdate', params: { id: topic.id } });
  };

  const createTopic = () => {
    router.push({ name: 'TopicCreate' });
  };
</script>

<template>
  <VRow class="pa-4">
    <VCol v-for="topic in topicsStore.items" :key="topic.id" cols="4">
      <TopicCard :topic="topic" @remove="topicsStore.remove" @update="updateTopic" />
    </VCol>
    <VCol>
      <VBtn class="big-square-button" :color="Colors.Primary" :variant="Variants.Outlined" @click="createTopic">
        <VIcon :icon="Icons.Add" :size="Sizes.XLarge" />
      </VBtn>
    </VCol>
  </VRow>
</template>
<style lang="scss" scoped>
  .big-square-button {
    width: 140px;
    height: 140px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
