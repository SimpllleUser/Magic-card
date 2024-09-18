<script setup lang="ts">
  import { Topic } from '@/core/models/Topic';

  interface Props {
    topic: Topic;
  }

  interface Emits {
    (event: 'remove', id: string): void;
    (event: 'update', topic: Topic): void;
  }

  defineProps<Props>();
  defineEmits<Emits>();
</script>

<template>
  <VCard :text="topic.description" :title="topic.title">
    <VCardActions>
      <VBtn @click="$emit('update', topic)">Edit</VBtn>
      <VBtn @click="$emit('remove', topic.id)">Remove</VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped lang="sass"></style>
