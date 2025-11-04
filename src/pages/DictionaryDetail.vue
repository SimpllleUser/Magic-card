<script setup lang="ts">
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
  /// TODO FIX convert into entry point
  import { useDictionaryStore } from '@/stores/dictionary';
  import { ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS } from '@/features/quiz/model/constants';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { useBreakPointsApp } from '@/shared/use/useBreakPointsApp';
  import DictionaryActions from '@/features/dictionary/ui/DictionaryActions.vue';
  import DictionaryList from '@/features/dictionary/ui/DictionaryList.vue';
  import { useNavigation } from '@/features/quiz/model/naigation';
  import { useKnowledgeLevelStore } from '@/stores/statistics';

  const modalStore = useModalStore();
  const knowledgeLevelStore = useKnowledgeLevelStore();
  const { goToQuiz, goToViewMode } = useNavigation();

  const route = useRoute();
  const dictionaryId = computed(() => route.params?.id!);

  const dictionaryStore = useDictionaryStore();

  const dictionary = computed(() => dictionaryStore.getById(dictionaryId.value)!);

  const selectedWords = ref([...dictionary.value?.items]);
  // const canPlayQuiz = computed(() => selectedWords.value.length >= MIN_WORDS_QUANTITY);

  const { isMobile } = useBreakPointsApp();

  onMounted(() => {
    knowledgeLevelStore.init(dictionary.value.id, dictionary.value.userId!);
  });
</script>

<template>
  <div class="content-wrapper mx-auto">
    <div>
      <div>
        totalScore:
        <pre>{{ knowledgeLevelStore.totalScore }}</pre>
      </div>
      <div>
        dueWords:
        <pre>{{ knowledgeLevelStore.dueWords }}</pre>
      </div>
      <div>
        learnedWords:
        <pre>{{ knowledgeLevelStore.learnedWords }}</pre>
      </div>
      <div>
        weakWords:
        <pre>{{ knowledgeLevelStore.weakWords }}</pre>
      </div>
    </div>
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
                :dictionary="dictionary"
                :selected-words="selectedWords"
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
