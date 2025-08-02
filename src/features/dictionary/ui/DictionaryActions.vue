```vue
<script setup lang="ts">
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { omit } from 'lodash';
  import QuizModeMenu from '@/shared/ui/QuizeModeMenu/QuizeModeMenu.vue';
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
  <VBtn
    v-if="isMobile"
    :color="Colors.Primary"
    icon
  >
    <VIcon :icon="Icons.Menu" />
    <VMenu activator="parent">
      <VList>
        <VListItem>
          <QuizModeMenu
            :is-mobile="isMobile"
            label="Play"
            @select="goToQuiz({ dictionaryId, words: selectedWords, type: $event })"
          />
        </VListItem>
        <VListItem>
          <VBtn
            :append-icon="Icons.File"
            class="mr-4"
            :class="{ 'w-100': isMobile }"
            :color="Colors.Primary"
            :disabled="!selectedWords.length"
            :variant="Variants.Elevated"
            @click="goToViewMode({ dictionaryId, words: selectedWords })"
          >
            View cards
          </VBtn>
        </VListItem>
        <VListItem>
          <VBtn
            class="mr-4"
            :class="{ 'w-100': isMobile }"
            :color="Colors.Primary"
            :variant="Variants.Outlined"
            @click="showModal(Modals.DictionaryStatistic)"
          >
            <span class="pr-2"> Statistics </span>
            <VIcon :icon="Icons.Chart" />
          </VBtn>
        </VListItem>
        <VListItem>
          <ExportButton
            class="mr-4"
            :data="getDictionaryForExport()"
            :is-mobile="isMobile"
            :title="dictionaryTitle"
          />
        </VListItem>
      </VList>
    </VMenu>
  </VBtn>
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
```
