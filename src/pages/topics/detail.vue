<script setup lang="ts">
  import BaseList from '@/shared/ui/BaseList/BaseList.vue';
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
  import { useTopicsStore } from '../../features/Topics/store/topics';
  import { DictionaryItem } from '@/core/models/Topic';
  import { Colors, Variants } from '@/core/models/enums';
  import { useQuizsStore } from '@/features/Play/store/quiz';

  const MIN_WORDS_QUANTITY = 5;

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

  const alertConfigInsufficientQuantityWords = {
    title: 'Attention!',
    text: `You must choose at least ${MIN_WORDS_QUANTITY} words!`,
    color: Colors.Info,
    variant: Variants.Tonal
  };

  const route = useRoute();
  const router = useRouter();
  const topicId = computed(() => route.params?.id!);

  const topicsStore = useTopicsStore();
  const quizStore = useQuizsStore();

  const topic = computed(() => topicsStore.getById(topicId.value));

  const mapItem = (item: DictionaryItem, index: number) => ({
    ...item,
    number: index + 1
  });
  const selectedWords = ref([...topic.value?.dictionary]);

  const canPlayQuize = computed(() => selectedWords.value.length >= MIN_WORDS_QUANTITY);

  const goToQuize = () => {
    quizStore.setWords(selectedWords.value);
    router.push({ name: 'Quize' });
  };
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
          <AnimationFade style="position: absolute; width: calc(100% - 2rem); margin-right: 20rem">
            <VAlert v-if="!canPlayQuize" v-bind="alertConfigInsufficientQuantityWords" class="mb-4" />
          </AnimationFade>
          <div class="list-wrapper" :class="{ 'is-alert': !canPlayQuize }">
            <BaseList
              v-model:selected-items="selectedWords"
              :data="topic.dictionary"
              header-title="Dictionary"
              hide-footer
              :keys="keys"
              :map-item="mapItem"
              selectable
            >
              <template #header-actions>
                <VBtn :color="Colors.Primary" :disabled="!canPlayQuize" :variant="Variants.Elevated" @click="goToQuize"
                  >Play</VBtn
                >
              </template>
              <template #empty-text>
                <div>
                  <p>
                    Let’s add some words
                    <VBtn
                      class="px-1"
                      :color="Colors.Primary"
                      :variant="Variants.Contained"
                      @click="router.push({ name: 'TopicUpdate', params: { id: topicId } })"
                    >
                      go to edit module
                    </VBtn>
                  </p>
                </div>
              </template>
            </BaseList>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
  .list-wrapper {
    position: relative;
    transition: all 0.3s ease-out;
  }
  .is-alert {
    padding-top: 6rem;
  }
</style>
