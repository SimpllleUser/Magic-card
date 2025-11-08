<script setup lang="ts">
  import { AnimationFade, useBreakPointsApp, useModalStore } from '@/shared';
  /// TODO FIX convert into entry point
  import { useDictionaryStore } from '@/stores/dictionary';
  import { ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS } from '@/features/quiz/model/constants';
  import { DictionaryActions, DictionaryItem, DictionaryList } from '@/features/dictionary';
  import { useNavigation } from '@/features/quiz/model/naigation';
  import { KnowledgeRemined, KnowledgeTotal } from '@/features/knowledge';
  import { useKnowledgeLevelStore } from '@/stores/knowledge';
  import { useLocalStorage } from '@vueuse/core';

  const modalStore = useModalStore();
  const knowledgeLevelStore = useKnowledgeLevelStore();
  const { goToQuiz, goToViewMode } = useNavigation();

  const route = useRoute();
  const dictionaryId = computed(() => route.params?.id!);

  const dictionaryStore = useDictionaryStore();

  const dictionary = computed(() => dictionaryStore.getById(dictionaryId.value)!);

  const selectedWords = useLocalStorage(`selectedWords_${dictionaryId.value}`, [...dictionary.value?.items]);

  const { isMobile } = useBreakPointsApp();

  const existDueWords = computed(() => knowledgeLevelStore.dueWords.length);
  const selectWordsDue = (words: DictionaryItem[]) => {
    selectedWords.value = words;
  };
</script>

<template>
  <div>
    <KnowledgeRemined
      v-if="existDueWords"
      :dictionary-items="dictionary.items"
      :due-words="knowledgeLevelStore.dueWords"
      @select-words-due="selectWordsDue"
    />
  </div>
  <div>
    <KnowledgeTotal
      :dictionary-id="dictionaryId"
      :user-id="dictionary.userId!"
    />
  </div>
  <div class="content-wrapper mx-auto">
    <VRow v-if="dictionary?.description.trim()">
      <VCol>
        <VCard
          class="py-4"
          elevation="2"
        >
          <VCardSubtitle>
            <p>{{ dictionary?.description }}</p>
          </VCardSubtitle>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VCard
          elevation="2"
          no-body
        >
          <VCardText class="pa-0">
            <AnimationFade style="position: absolute; width: calc(100% - 2rem); margin-right: 20rem">
              <VAlert
                v-bind="ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS"
                class="mb-4"
              />
            </AnimationFade>
            <div
              class="list-wrapper"
              :class="{ 'is-mobile': isMobile }"
            >
              <DictionaryList
                :key="selectedWords.length"
                :dictionary="dictionary"
                :due-words="knowledgeLevelStore.dueWords"
                :learned-words="knowledgeLevelStore.learnedWords"
                :selected-words="selectedWords"
                :weak-words="knowledgeLevelStore.weakWords"
                @change-selected-words="selectedWords = $event"
              >
                <template #header-actions>
                  <div class="pr-2">
                    <DictionaryActions
                      :dictionary-id="dictionaryId"
                      :dictionary-title="dictionary.title"
                      :go-to-quiz="goToQuiz"
                      :go-to-view-mode="goToViewMode"
                      :is-mobile="isMobile"
                      :selected-words="selectedWords"
                      :show-modal="modalStore.show"
                    />
                  </div>
                </template>
              </DictionaryList>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
  .list-wrapper {
    position: relative;
    transition: all 0.3s ease-out;
  }
  .is-alert {
    padding-top: 6rem;
  }
</style>
