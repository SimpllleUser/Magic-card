<script lang="ts" setup>
  import { QuestionItem } from '../../model/composables/useSelectWord';

  const props = defineProps<{
    actualQuestion: QuestionItem;
  }>();

  const answer = ref<string>(props.actualQuestion?.answer || '');

  defineEmits<{
    (event: 'setAnswer', payload: { question: QuestionItem; value: string }): void;
  }>();
</script>
<template>
  <div>
    <VTextField
      v-model="answer"
      maxlength="120"
      type="text"
      @update:model-value="$emit('setAnswer', { question: actualQuestion, value: $event })"
    />
  </div>
</template>
