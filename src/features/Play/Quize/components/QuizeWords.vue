<script lang="ts" setup>
  import { QuestionItem } from '../composables/useQuize';
  import { Colors, Variants } from '@/core/models/enums';

  defineProps<{
    actualQuestion: QuestionItem;
    actualVariants: Array<QuestionItem>;
  }>();

  const emit = defineEmits<{
    (event: 'set-answer', payload: { question: QuestionItem; answer: QuestionItem }): void;
  }>();
</script>
<template>
  <div>
    <VBtn
      v-for="(variant, indexVariant) in actualVariants"
      :key="indexVariant"
      :active="actualQuestion.answerId === variant.id"
      class="mx-1"
      :color="Colors.Primary"
      :variant="Variants.Outlined"
      @click="emit('set-answer', { question: actualQuestion, answer: variant })"
    >
      {{ variant.to }}
    </VBtn>
  </div>
</template>
