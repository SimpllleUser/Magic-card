<script setup lang="ts">
  import { MemoryService } from '@/features/aiMemory';
  import { PROMPTS } from '@/features/aiMemory/constants';
  import { AIService, AnimationFade, useBreakPointsApp, useModalStore } from '@/shared';
  import { useDictionaryStore } from '@/stores/dictionary';
  import { ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS, useNavigation } from '@/features/quiz';
  import { DictionaryActions, DictionaryItem, DictionaryList } from '@/features/dictionary';
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

  // const aiService = new AIService();
  //
  // const generateDictionary = async () => {
  //   const SYSTEM_INSTRUCTION = 'Respond only with valid JSON — no text outside the JSON object.';
  //   await aiService.generateTextContent(PROMPTS.dictionary('Sport', 10), SYSTEM_INSTRUCTION);
  // };

  onMounted(async () => {
    await generateDictionary();
  });
  // const memoryService = new MemoryService();
  //
  // const delay = async (ms: number): Promise<void> => {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // };
  // const getAllTipsFromDictionary = async () => {
  //   for (const item of dictionary.value.items) {
  //     await memoryService.generateMnemonic(item.from);
  //     await memoryService.generateExampleSentences(item.from);
  //     await delay(5000);
  //   }
  // };
</script>

<template>
  <div>
    <!--    <VBtn-->
    <!--      :color="Colors.Error"-->
    <!--      @click="getAllTipsFromDictionary"-->
    <!--    >-->
    <!--      Run get tips from all words-->
    <!--    </VBtn>-->
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
