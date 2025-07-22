<script setup lang="ts">
  import { computed } from 'vue';
  import { useQuizFactory } from '../model/composables/useQuizFactory';
  import { QuizType } from '../model/types';
  import { QuestionItem } from '../model/composables/useSelectWord';
  import { Breakpoints, literalBreakpoint } from '@/shared/use/usebreakPoints';
  import { DictionaryItem } from '@/features/dictionary/model/types';
  import WordSlider from '@/shared/ui/WordSlider.vue';

  interface Emits {
    (event: 'finished', payload: QuestionItem[]): void;
    (event: 'change-question', payload: QuestionItem): void;
    (event: 'init', payload: QuestionItem): void;
  }

  const props = withDefaults(
    defineProps<{
      questions: DictionaryItem[];
      quizType: QuizType;
      sliderConfig?: {
        infinitySlide?: boolean;
      };
    }>(),
    {
      questions: () => [],
      quizType: QuizType.SelectWord,
      sliderConfig: () => ({
        infinitySlide: true
      })
    }
  );

  const emit = defineEmits<Emits>();

  const { quizComponent, quizLogic } = useQuizFactory(props.quizType);

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

  watch(
    () => actualQuestionIndex.value,
    () => {
      emit('change-question', actualQuestion.value);
    }
  );

  const init = () => {
    emit('init', actualQuestion.value);
  };

  onMounted(() => {
    init();
  });

  defineExpose({
    reset,
    toFinishQuiz
  });
</script>

<template>
  <div
    class="mx-auto"
    :class="classes"
  >
    <WordSlider
      :infinity-slide="sliderConfig.infinitySlide"
      :words="questions"
      @change-slide="onChangeSlide"
    >
      <template #default="{ word: question }">
        <div
          class="d-flex justify-center align-center"
          style="height: calc(100% - 6rem)"
        >
          <span class="text-h3 font-weight-bold">{{ getQuestion(question) }}</span>
        </div>
      </template>
    </WordSlider>
    <VCardText>
      <component
        :is="quizComponent"
        :key="actualQuestionIndex"
        :actual-question="actualQuestion"
        v-bind="{ actualVariants: actualVariants || [] }"
        @set-answer="setAnswer"
      />
    </VCardText>
  </div>
  <slot
    :finish="toFinishQuiz"
    name="controls"
    :reset="reset"
  ></slot>
</template>
