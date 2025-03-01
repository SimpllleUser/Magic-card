<script setup lang="ts">
  import { Colors } from '@/core/models/enums';
  import { computed } from 'vue';
  import { useQuizeFactory } from '../model/composables/useQuizeFactory';
  import { QuizeType } from '../model/types';
  import { QuestionItem } from '../model/composables/useSelectWord';
  import { Breakpoints, literalBreakpoint } from '@/shared/use/usebreakPoints';
  import { DictionaryItem } from '@/features/dictionary/model/types';
  import WordSlider from '@/shared/ui/WordSlider.vue';

  interface Emits {
    (event: 'finished', payload: QuestionItem[]): void;
  }

  const props = withDefaults(defineProps<{ questions: DictionaryItem[]; quizType: QuizeType }>(), {
    questions: () => [],
    quizType: QuizeType.SelectWord
  });

  const emit = defineEmits<Emits>();

  const { quizComponent, quizLogic } = useQuizeFactory(props.quizType);

  const { actualQuestionIndex, setAnswer, reset, getQuestion, actualQuestion, questions, actualVariants } =
    quizLogic.value([...props.questions]);

  const toFinishQuiz = () => {
    emit('finished', questions.value);
    reset();
  };

  const onChangeSlide = (index: number) => {
    actualQuestionIndex.value = index;
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
    <WordSlider :words="questions" @change-slide="onChangeSlide">
      <template #default="{ word: question, index }">
        <VCardText class="d-flex justify-center">
          <div class="text-h3 font-weight-bold">{{ getQuestion(question) }}</div>
        </VCardText>
        <VCardText class="d-flex justify-center" style="margin-top: 6rem;">
          <component
            :is="quizComponent"
            :key="index"
            :actual-question="actualQuestion"
            v-bind="{ actualVariants: actualVariants || [] }"
            @set-answer="setAnswer"
          />
        </VCardText>
      </template>
    </WordSlider>
  </div>

  <div class="d-flex justify-center pt-12">
    <VBtn class="mr-4" :color="Colors.Primary" @click="reset">Restart</VBtn>
    <VBtn :color="Colors.Primary" @click="toFinishQuiz">Finish</VBtn>
  </div>
</template>
