<script setup lang="ts">
  import { Topic } from '@/core/models/Topic';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';

  interface Props {
    topic: Topic;
  }

  interface Emits {
    (event: 'remove', id: string): void;
    (event: 'update', topic: Topic): void;
  }

  defineProps<Props>();
  defineEmits<Emits>();

  const modal = useModalStore();
</script>

<template>
  <VCard :text="topic.description" :title="topic.title">
    <VCardActions>
      <VBtn
        @click="
          () => {
            modal.show(Modals.TopicUpdate);
            $emit('update', topic);
          }
        "
        >Edit</VBtn
      >
      <VBtn @click="$emit('remove', topic.id)">Remove</VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped lang="sass"></style>
