<script lang="ts" setup>
  import TopicCard from '@/features/Topics/TopicCard/index.vue';
  import { useTopicsStore } from '@/features/Topics/store/topics';
  import TopicForm from '@/features/Topics/TopicForm/index.vue';
  import { Topic } from '@/core/models/Topic';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import { Colors, Sizes, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';

  const topicsStore = useTopicsStore();
  const modal = useModalStore();

  const currentTopic = ref<Topic>({});
  const setCurrentTopic = (topic: Topic | Record<string, unknown>) => {
    currentTopic.value = topic;
  };

  const onUpdateSubmit = (topic: Topic) => {
    topicsStore.update(topic);
    modal.hide(Modals.TopicUpdate);
  };
  const onCreateSubmit = (topic: Omit<Topic, 'id'>) => {
    topicsStore.create(topic);
    modal.hide(Modals.TopicCreate);
  };
</script>

<template>
  <div>
    <TopicForm :id="Modals.TopicUpdate" :form-data="currentTopic" title="Topic update" @submit="onUpdateSubmit" />
    <!-- <TopicForm :id="Modals.TopicCreate" title="Topic create" @submit="onCreateSubmit" /> -->
    <VRow class="pa-4">
      <VCol v-for="topic in topicsStore.items" :key="topic.id" cols="4">
        <TopicCard :topic="topic" @remove="topicsStore.remove" @update="setCurrentTopic" />
      </VCol>
      <VCol>
        <VBtn
          class="big-square-button"
          :color="Colors.Primary"
          :variant="Variants.Outlined"
          @click="modal.show(Modals.TopicCreate)"
        >
          <VIcon :icon="Icons.Add" :size="Sizes.XLarge" />
        </VBtn>
      </VCol>
    </VRow>
  </div>
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
