<script lang="ts" setup>
  import { QuestionItem } from '../composables/useSelectWord';
  import { Colors, Variants } from '@/core/models/enums';

  const props = defineProps<{
    actualQuestion: QuestionItem;
    actualVariants: Array<QuestionItem>;
  }>();

  const emit = defineEmits<{
    (event: 'set-answer', payload: { question: QuestionItem; answer: QuestionItem }): void;
  }>();

  const isAactive = (answerId: string) => {
    return props.actualQuestion.answerId === answerId;
  };
</script>
<template>
  <div>
    <VBtn
      v-for="(variant, indexVariant) in actualVariants"
      :key="indexVariant"
      class="mx-1 bg-surface-variant:"
      :color="isAactive(variant.id) ? Colors.Accent : Colors.SurfaceVariantText"
      :variant="isAactive(variant.id) ? Variants.Flat : Variants.Outlined"
      @click="emit('set-answer', { question: actualQuestion, answer: variant })"
    >
      {{ variant.to }}
    </VBtn>
  </div>
</template>
