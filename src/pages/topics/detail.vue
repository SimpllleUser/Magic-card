<script setup lang="ts">
  import BaseList from '@/shared/ui/BaseList/BaseList.vue';
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
  import { useTopicsStore } from '../../features/Topics/store/topics';
  import { DictionaryItem } from '@/core/models/Topic';
  import { Colors, Variants } from '@/core/models/enums';
  import { useQuizsStore } from '@/features/Play/store/quiz';
  import { Icons } from '@/core/models/icons';
  import { QUIZE_TYPES_OPTIONS } from '../../features/Play/Quize/constants';
  import { log } from 'node:console';
  import { QuizeType } from '@/features/Play/Quize/types';

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

  const goToQuize = (type: QuizeType) => {
    quizStore.setActiveModule(topicId.value);
    quizStore.setWords(selectedWords.value);
    quizStore.setCurrentType(type);
    router.push({ name: 'Quize' });
  };

  const goToViewMode = () => {
    quizStore.setActiveModule(topicId.value);
    quizStore.setWords(selectedWords.value);
    router.push({ name: 'ViewModeWords' });
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
                <VBtn
                  :append-icon="Icons.File"
                  class="mr-4"
                  :color="Colors.Primary"
                  :disabled="!selectedWords.length"
                  :variant="Variants.Elevated"
                  @click="goToViewMode"
                  >View cards</VBtn
                >
                <VMenu>
                  <template #activator="{ props }">
                    <VBtn
                      :append-icon="Icons.ChevronDown"
                      :color="Colors.Primary"
                      :disabled="!canPlayQuize"
                      :variant="Variants.Elevated"
                      v-bind="props"
                      >Play</VBtn
                    >
                  </template>
                  <VList>
                    <VListItem v-for="(item, index) in QUIZE_TYPES_OPTIONS" :key="index" :value="index">
                      <VListItemTitle @click="goToQuize(item.value)">{{ item.title }}</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </template>
              <template #empty-text>
                <div>
                  <p>
                    Let’s add some words
                    <VBtn
                      class="px-1"
                      :color="Colors.Primary"
                      :to="{ name: 'TopicUpdate', params: { id: topicId } }"
                      :variant="Variants.Contained"
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
