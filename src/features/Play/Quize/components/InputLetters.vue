<script lang="ts" setup>
  import { QuestionItem } from '../composables/useSelectWord';

  const props = defineProps<{
    actualQuestion: QuestionItem;
    actualVariants: Array<QuestionItem>;
  }>();

  const answer = ref<string>(props.actualQuestion?.answer || '');

  defineEmits<{
    (event: 'setAnswer', payload: { question: QuestionItem; value: string }): void;
  }>();
</script>
<template>
  <div>
    <VOtpInput
      v-model="answer"
      :length="actualQuestion?.from.length"
      :min-width="actualQuestion?.from.length * 50"
      type="text"
      @update:model-value="$emit('setAnswer', { question: actualQuestion, value: $event })"
    />
  </div>
</template>
