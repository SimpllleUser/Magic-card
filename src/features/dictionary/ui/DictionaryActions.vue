<script setup lang="ts">
import { omit } from 'lodash';
import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import QuizModeMenu from '@/shared/ui/QuizModeMenu/QuizModeMenu.vue';
  import ExportButton from '@/widget/ExportWidget/ui/ExportButton.vue';
  import { Modals } from '@/core/models/modals';
  import type { DictionaryItem } from '@/features/dictionary/model/types';

  const props = defineProps<{
    isMobile: boolean;
    dictionaryId: string;
    selectedWords: DictionaryItem[];
    dictionaryTitle: string;
    goToQuiz: (options: { dictionaryId: string; words: DictionaryItem[]; type: any }) => void;
    goToViewMode: (options: { dictionaryId: string; words: DictionaryItem[] }) => void;
    showModal: (modal: Modals) => void;
  }>();

  const getDictionaryForExport = () => props.selectedWords.map((item) => omit(item, ['id']));
</script>

<template>
  <div
    v-if="isMobile"
    class="d-flex items-center justify-space-between"
  >
    <QuizModeMenu
      :is-mobile="isMobile"
      label="Play"
      @select="goToQuiz({ dictionaryId, words: selectedWords, type: $event })"
    />

    <VBtn
      class="mx-2"
      :color="Colors.Primary"
      :disabled="!selectedWords.length"
      :variant="Variants.Elevated"
      @click="goToViewMode({ dictionaryId, words: selectedWords })"
    >
      <VIcon :icon="Icons.Eye" />
    </VBtn>

    <VBtn
      class="mr-2"
      :color="Colors.Primary"
      :variant="Variants.Outlined"
      @click="showModal(Modals.DictionaryStatistic)"
    >
      <VIcon :icon="Icons.Chart" />
    </VBtn>

    <ExportButton
      class="mr-2"
      :data="getDictionaryForExport()"
      :is-mobile="isMobile"
      :title="dictionaryTitle"
    />
  </div>
  <div
    v-else
    class="d-flex items-center"
  >
    <ExportButton
      class="mr-4"
      :data="getDictionaryForExport()"
      :title="dictionaryTitle"
    />
    <VBtn
      class="mr-4"
      :color="Colors.Primary"
      :variant="Variants.Outlined"
      @click="showModal(Modals.DictionaryStatistic)"
    >
      <span class="pr-2"> Statistics </span>
      <VIcon :icon="Icons.Chart" />
    </VBtn>
    <VBtn
      :append-icon="Icons.File"
      class="mr-4"
      :color="Colors.Primary"
      :disabled="!selectedWords.length"
      :variant="Variants.Elevated"
      @click="goToViewMode({ dictionaryId, words: selectedWords })"
    >
      View cards
    </VBtn>
    <QuizModeMenu
      label="Play"
      @select="goToQuiz({ dictionaryId, words: selectedWords, type: $event })"
    />
  </div>
</template>
<style lang="scss" scoped>
  .list-actions-menu {
    width: 100vw !important;
    left: -20px;
  }
</style>
