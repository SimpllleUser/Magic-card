<script lang="ts" setup>
  import { QuestionItem } from '../composables/useQuize';

  const props = defineProps<{
    question: QuestionItem;
    actualVariants: Array<QuestionItem>;
  }>();

  const answer = ref<string>(props.question?.answer || '');

  defineEmits<{
    (event: 'setAnswer', payload: { question: QuestionItem; value: string }): void;
  }>();
</script>
<template>
  <div>
    <VOtpInput
      v-model="answer"
      :length="question?.from.length"
      :min-width="question?.from.length * 50"
      type="text"
      @update:model-value="$emit('setAnswer', { question, value: $event })"
    />
  </div>
</template>
