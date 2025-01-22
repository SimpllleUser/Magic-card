<script setup lang="ts">
  import BaseList from '@/shared/ui/BaseList/BaseList.vue';
  import { useTopicsStore } from '../../features/Topics/store/topics';
  import { DictionaryItem } from '@/core/models/Topic';
  import { Colors, Variants } from '@/core/models/enums';
  // import ParserTextToDictionary from '../../widget/ParserTextToDictionary/index.vue';

  const route = useRoute();
  const router = useRouter();
  const topicId = computed(() => route.params.id!);

  const topicsStore = useTopicsStore();

  const topic = computed(() => topicsStore.getById(topicId.value));
  const keys = [
    {
      title: '#',
      key: 'number',
      sortable: false
    },
    {
      title: 'From',
      key: 'from',
      sortable: false
    },
    {
      title: 'To',
      key: 'to',
      sortable: false
    }
  ];

  const mapItem = (item: DictionaryItem, index: number) => ({
    ...item,
    number: index + 1
  });
  const items = ref(topic.value?.dictionary);
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
        <VCardText>
          <BaseList
            header-title="Dictionary"
            v-model:selectedItems="items"
            :data="topic.dictionary"
            :keys="keys"
            :mapItem="mapItem"
            selectable
            hide-footer
          >
            <template #header-actions>
              <VBtn :color="Colors.Primary" :variant="Variants.Elevated">Play</VBtn>
            </template>
            <template #empty-text>
              <div>
                <p>
                  Let’s add some words
                  <VBtn
                    @click="router.push({ name: 'TopicUpdate', params: { id: topicId } })"
                    :color="Colors.Primary"
                    :variant="Variants.Contained"
                    class="px-1"
                  >
                    go to edit module
                  </VBtn>
                </p>
              </div>
            </template>
          </BaseList>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style></style>
