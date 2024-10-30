<script setup lang="ts">
  import { Topic } from '@/core/models/Topic';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import { defineEmits } from 'vue';

  interface Props {
    topic: Topic;
  }

  interface Emits {
    (event: 'remove', id: string): void;
    (event: 'update', topic: Topic): void;
  }

  defineProps<Props>();
  const emit = defineEmits<Emits>();

  const router = useRouter();

  const modal = useModalStore();

  const onUpdateTopic = (topic: Topic) => {
    modal.show(Modals.TopicUpdate);
    emit('update', topic);
  };

  const goToDetailTopic = (id: string) => {
    router.push({ name: 'TopicDetail', params: { id } });
  };
</script>

<template>
  <VCard :text="topic.description" :title="topic.title">
    <VCardActions>
      <VBtn @click="goToDetailTopic(topic.id)">Detail</VBtn>
      <VBtn @click="onUpdateTopic(topic)">Edit</VBtn>
      <VBtn @click="$emit('remove', topic.id)">Remove</VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped lang="sass"></style>
