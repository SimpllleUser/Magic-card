<script lang="ts" setup>
  import TopicCard from '@/features/Topics/TopicCard/index.vue';
  import { useTopicsStore } from '@/features/Topics/store/topics';
  import { Topic } from '@/core/models/Topic';
  import { Colors, Sizes, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import ConfirmModal from '@/shared/ui/ConfirmModal/ConfirmModal.vue';

  const router = useRouter();
  const modal = useModalStore();

  const topicsStore = useTopicsStore();

  const updateTopic = (topic: Topic | Record<string, unknown>) => {
    router.push({ name: 'TopicUpdate', params: { id: topic.id } });
  };

  const createTopic = () => {
    router.push({ name: 'TopicCreate' });
  };

  const onRemoveTopic = (id: string) => {
    modal.show(Modals.TopicConfirmRemove, {
      title: 'Remove topic',
      description: 'Are you sure remove topic ?',
      type: Colors.Error,
      onConfirm: () => {
        topicsStore.remove(id);
      }
    });
  };
</script>

<template>
  <VRow class="pa-4">
    <ConfirmModal :id="Modals.TopicConfirmRemove" />
    <VCol v-for="topic in topicsStore.items" :key="topic.id" cols="4">
      <TopicCard :topic="topic" @remove="onRemoveTopic" @update="updateTopic" />
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
