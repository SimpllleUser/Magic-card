<script setup lang="ts">
  import { useTopicsStore } from '../../features/Topics/store/topics';
  import ParserTextToDictionary from '../../widget/ParserTextToDictionary/index.vue';

  const route = useRoute();
  const topicId = computed(() => route.params.id!);

  const topicsStore = useTopicsStore();

  const topic = computed(() => topicsStore.getById(topicId.value));
</script>

<template>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle>
          <h3 class="text-h3">{{ topic?.title }}</h3>
        </VCardTitle>
        <VCardText>
          <p>{{ topic?.description }}</p>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol>
      <VCard>
        <VCardTitle>
          <h3 class="text-h6">Dictionary list</h3>
        </VCardTitle>
        <VCardText> Items </VCardText>
        <VCardText>
          <ParserTextToDictionary />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style></style>
