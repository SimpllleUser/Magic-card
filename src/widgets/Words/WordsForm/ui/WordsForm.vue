<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import { WordEntity } from 'src/widgets/Words';
  import { ImportMain } from 'src/widgets/Words/ImportWords';
  import { WordListForm } from 'src/shared/ui/Words/WordListForm';

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
      <WordListForm v-model="wordsListModel" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
