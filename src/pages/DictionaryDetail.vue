<script setup lang="ts">
  import BaseList from '@/shared/ui/BaseList/BaseList.vue';
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
  /// TODO FIX convert into entry point
  import { useDictionaryStore } from '../stores/dictionary';
  import { ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS, MIN_WORDS_QUANTITY } from '@/features/quiz/model/constants';
  import { useNavigation } from '@/features/quiz/model/naigation';
  import { DictionaryItem } from '@/features/dictionary/model/types';
  import { PageNames } from '@/router/types';
  import { Colors, Variants } from '@/core/models/enums';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { DictionaryStatisticModal, useDictionaryStatistics } from '@/features/dictionary-statistics';
  import { useBreakPointsApp } from '@/shared/use/useBreakPointsApp';
  import DictionaryActions from '@/features/dictionary/ui/DictionaryActions.vue';

  const modalStore = useModalStore();
  const dictionaryStatistics = useDictionaryStatistics();

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

  /// TODO separte into useComposable -- START
  const dictionaryStore = useDictionaryStore();

  const dictionary = computed(() => dictionaryStore.getById(dictionaryId.value)!);

  const mapItem = (item: DictionaryItem, index: number) => ({
    ...item,
    number: index + 1
  });

  const selectedWords = ref([...dictionary.value?.items]);

  const canPlayQuize = computed(() => selectedWords.value.length >= MIN_WORDS_QUANTITY);

  const statistics = computed(() => dictionaryStatistics.getByDictionaryId(dictionaryId.value));
  const { isMobile } = useBreakPointsApp();
</script>

<template>
  <DictionaryStatisticModal
    :statistics="statistics"
    :title="dictionary.title"
  />
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
          <VCardText>
            <AnimationFade style="position: absolute; width: calc(100% - 2rem); margin-right: 20rem">
              <VAlert
                v-if="!canPlayQuize && dictionary?.items.length"
                v-bind="ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS"
                class="mb-4"
              />
            </AnimationFade>
            <!--            'is-alert': !canPlayQuize,-->
            <div
              class="list-wrapper"
              :class="{ 'is-mobile': isMobile }"
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

<style lang="scss" scoped>
  .is-mobile {
    :deep(.v-table) {
      header.v-toolbar {
        position: fixed;
        z-index: 9;
        left: 0;
        top: 0;
        margin-top: 4rem;
      }
    }
  }
  .list-wrapper {
    margin-top: 1.5rem;
    position: relative;
    transition: all 0.3s ease-out;
  }
  .is-alert {
    padding-top: 6rem;
  }
</style>
