<script setup lang="ts">
  import { useVModel } from '@vueuse/core';

  import WordsListForm from './WordsListForm.vue';
  // import Imports from './Imports/_index.vue';
  import { WordEntity } from '../types/word';
  import { ImportMain } from 'src/widgets/Words/ImportWords';

  interface Props {
    modelValue: Array<WordEntity>;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['update:modelValue']);

  const wordsListModel = useVModel(props, 'modelValue', emit);

  const setImportedWords = (words: Array<WordEntity>) => {
    wordsListModel.value = [...words, ...wordsListModel.value];
  };
</script>

<template>
  <div class="full-width">
    <div class="actions">
      <ImportMain @import="setImportedWords" />
    </div>
    <div>
      <WordsListForm v-model="wordsListModel" />
    </div>
  </div>
</template>
