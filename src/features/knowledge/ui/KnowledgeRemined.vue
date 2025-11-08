<script setup lang="ts">
  import { WordProgress } from '@/features/knowledgeLevel/model/types';
  import { DictionaryItem } from '@/features/dictionary/model/types';
  import { Colors, Variants } from '@/core/models/enums';
  import { EmitEvents } from '@/shared/index/types';

  defineOptions({ name: 'KnowledgeRemined' });

  interface Props {
    dueWords: WordProgress[];
    dictionaryItems: DictionaryItem[];
  }

  const emits = defineEmits<
    EmitEvents<{
      'select-words-due': DictionaryItem[];
    }>
  >();

  const props = defineProps<Props>();

  const selectWordsDue = () => {
    const currentWords: DictionaryItem[] = [];
    props.dueWords.forEach((word) => {
      const currentWord = props.dictionaryItems.find((item) => item.id === word.wordId);
      currentWord && currentWords.push(currentWord);
    });
    emits('select-words-due', currentWords);
  };
</script>

<template>
  <VAlert
    closable
    :color="Colors.Secondary"
    :variant="Variants.Tonal"
  >
    <div class="d-flex justify-space-between align-center">
      <div>You have words to practice!</div>
      <div>
        <VBtn
          :variant="Variants.Tonal"
          @click="selectWordsDue"
          >Select words</VBtn
        >
      </div>
    </div>
  </VAlert>
</template>

<style scoped lang="scss"></style>
