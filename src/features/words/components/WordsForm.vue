<script setup lang="ts">
  import { useVModel } from '@vueuse/core';

  import WordsList from './WordsList.vue';
  import Imports from './Imports/_index.vue';
  import { WordEntity } from '../types/word';

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
      <Imports @import="setImportedWords" />
    </div>
    <div>
      <words-list v-model="wordsListModel" :words="wordsListModel" />
    </div>
  </div>
</template>
