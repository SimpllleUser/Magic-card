<script setup lang="ts">
  import BaseList from '@/shared/ui/BaseList/BaseList.vue';
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
  import { useDictionaryStore } from '../stores/dictionary';
  import { Icons } from '@/core/models/icons';
  import { ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS, MIN_WORDS_QUANTITY } from '@/features/quiz/model/constants';
  import { useNavigation } from '@/features/quiz/model/naigation';
  import { DictionaryItem } from '@/features/dictionary/model/types';
  import { PageNames } from '@/router/types';
  import QuizeModeMenu from '@/shared/ui/QuizeModeMenu/QuizeModeMenu.vue';
  import { Colors, Variants } from '@/core/models/enums';
  import ExportButton from '@/widget/ExportWidget/ui/ExportButton.vue';
  import { omit } from 'lodash';

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

  const route = useRoute();
  const dictionaryId = computed(() => route.params?.id!);
  const { goToQuiz, goToViewMode } = useNavigation();

  const dictionaryStore = useDictionaryStore();

  const dictionary = computed(() => dictionaryStore.getById(dictionaryId.value)!);

  const mapItem = (item: DictionaryItem, index: number) => ({
    ...item,
    number: index + 1
  });

  const selectedWords = ref([...dictionary.value?.items]);

  const canPlayQuize = computed(() => selectedWords.value.length >= MIN_WORDS_QUANTITY);

  const getDictionaryForExport = () => selectedWords.value.map((item) => omit(item, ['id']));
</script>

<template>
  <div class="content-wrapper mx-auto">
    <VRow>
      <VCol>
        <VCard
          class="py-4"
          elevation="2"
        >
          <VCardTitle>
            <h3 class="text-h3">{{ dictionary?.title }}</h3>
          </VCardTitle>
          <VCardSubtitle>
            <p>{{ dictionary?.description }}</p>
          </VCardSubtitle>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VCard elevation="2">
          <VCardText>
            <AnimationFade style="position: absolute; width: calc(100% - 2rem); margin-right: 20rem">
              <VAlert
                v-if="!canPlayQuize"
                v-bind="ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS"
                class="mb-4"
              />
            </AnimationFade>
            <div
              class="list-wrapper"
              :class="{ 'is-alert': !canPlayQuize }"
            >
              <BaseList
                v-model:selected-items="selectedWords"
                :data="dictionary?.items"
                header-title="Dictionary"
                hide-footer
                :keys="keys"
                :map-item="mapItem"
                selectable
              >
                <template #header-actions>
                  <ExportButton
                    class="mr-4"
                    :data="getDictionaryForExport()"
                    :title="dictionary.title"
                  />
                  <VBtn
                    :append-icon="Icons.File"
                    class="mr-4"
                    :color="Colors.Primary"
                    :disabled="!selectedWords.length"
                    :variant="Variants.Elevated"
                    @click="
                      goToViewMode({
                        dictionaryId: dictionaryId,
                        words: selectedWords
                      })
                    "
                  >
                    View cards
                  </VBtn>
                  <QuizeModeMenu
                    label="Play"
                    @select="
                      goToQuiz({
                        dictionaryId: dictionaryId,
                        words: selectedWords,
                        type: $event
                      })
                    "
                  />
                </template>
                <template #empty-text>
                  <div>
                    <p>
                      Let’s add some words
                      <VBtn
                        class="px-1"
                        :color="Colors.Primary"
                        :to="{ name: PageNames.DictionaryUpdate, params: { id: dictionaryId } }"
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
  </div>
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
