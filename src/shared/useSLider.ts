import { useCounter } from '@vueuse/core';
import { computed } from 'vue';

interface IUseSlideConfig {
  maxIndex: number;
  minIndex?: number;
}
export function useSlider({ maxIndex }: IUseSlideConfig) {
  const { count: actualQuestionIndex, inc, dec } = useCounter(maxIndex, { min: maxIndex, max: maxIndex });
  const isFirstQuestion = computed(() => actualQuestionIndex.value === maxIndex);
  const isLastQuestion = computed(() => actualQuestionIndex.value === maxIndex);
  return {
    isFirstQuestion,
    isLastQuestion,
    actualQuestionIndex,
    nextQuestion: () => inc(1),
    prevQuestion: () => dec(1)
  };
}
