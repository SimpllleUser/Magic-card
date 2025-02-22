<script setup lang="ts">
  import { DictionaryItem } from '@/core/models/Topic';
  import { Colors, Variants } from '@/core/models/enums';
  import { computed } from 'vue';
  import { useQuizeFactory } from '../composables/useQuizeFactory';
  import { QuizeType } from '../types';
  import { QuestionItem } from '../composables/useSelectWord';
  import { Breakpoints, literalBreakpoint } from '@/shared/use/usebreakPoints';

  interface Emits {
    (event: 'finished', payload: QuestionItem[]): void;
  }

  const props = withDefaults(defineProps<{ questions: DictionaryItem[]; quizType: QuizeType }>(), {
    questions: () => [],
    quizType: QuizeType.SelectWord
  });

  const emit = defineEmits<Emits>();

  const { quizComponent, quizLogic } = useQuizeFactory(props.quizType);

  const { setAnswer, reset, getQuestion, actualQuestionIndex, actualQuestion, questions, actualVariants } =
    quizLogic.value([...props.questions]);

  const titleCard = computed(() => `${actualQuestionIndex.value + 1}/${questions.value.length}`);

  const actualKey = computed(() => questions.value[actualQuestionIndex.value].id);

  const toFinishQuiz = () => {
    emit('finished', questions.value);
    reset();
  };

  const classes = computed(() => {
    return {
      'w-50': literalBreakpoint.value === Breakpoints.Xl,
      'w-75': literalBreakpoint.value === Breakpoints.Lg,
      'w-100': [Breakpoints.Md, Breakpoints.Sm].includes(literalBreakpoint.value)
    };
  });
</script>

<template>
  <div class="mx-auto" :class="classes">
    <VCarousel v-model="actualQuestionIndex" height="20rem" hide-delimiters>
      <VCarouselItem v-for="(question, index) in questions" :key="index">
        <VCard class="question-card rounded-xl ma-4" :color="Colors.Primary" :variant="Variants.Outlined">
          <VCardTitle>
            <div class="text-grey100">{{ titleCard }}</div>
          </VCardTitle>
          <VCardText class="d-flex justify-center py-10">
            <div class="text-h3 font-weight-bold">{{ getQuestion(question) }}</div>
          </VCardText>
          <VCardText class="d-flex justify-center py-10">
            <component
              :is="quizComponent"
              :key="actualKey"
              :actual-question="actualQuestion"
              v-bind="{ actualVariants: actualVariants || [] }"
              @set-answer="setAnswer"
            />
          </VCardText>
        </VCard>
      </VCarouselItem>
    </VCarousel>
  </div>

  <div class="d-flex justify-center pt-4">
    <VBtn class="mr-4" :color="Colors.Primary" @click="reset">Restart</VBtn>
    <VBtn :color="Colors.Primary" @click="toFinishQuiz">Finish</VBtn>
  </div>
</template>

<style lang="scss" scoped>
  .question-card {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
</style>
