<script setup lang="ts">
  import * as uuid from 'uuid';
  import { Modals } from '@/core/models/modals';
  import { QuestionItem } from '@/features/quiz/model/composables/useSelectWord';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import QuizResult from '@/features/quiz/ui/QuizResult.vue';
  import DynamicQuiz from '@/features/quiz/ui/DynamicQuiz.vue';
  import { useQuizStore } from '@/stores/quiz';
  import QuizControls from '@/features/quiz/ui/QuizControls.vue';
  import { useSecondsCounter, useTrackingTime } from '@/shared/use/useSecondsCounter';

  const quizStore = useQuizStore();
  const modal = useModalStore();
  const finishedQuestions = ref<QuestionItem[]>([]);

  const onFinishedQuiz = (questions: QuestionItem[]) => {
    finishedQuestions.value = questions;
    modal.show(Modals.FinishQuiz);
  };

  const quizKey = ref(uuid.v4());

  const onRetry = () => {
    quizKey.value = uuid.v4();
  };

  /// Put this code on composable  START
  const actualQuizId = ref('');
  const secondsPerQuestion = new Map<string, number>([]);

  const toFixTimePerQuestion = (value: number) => {
    const prevValue = secondsPerQuestion.get(actualQuizId.value) || 0;
    secondsPerQuestion.set(actualQuizId.value, prevValue + value);
  };

  const trackingTime = useSecondsCounter(0, {
    onStart: toFixTimePerQuestion,
    onFinish: toFixTimePerQuestion
  });

  const initQuiz = (question: QuestionItem) => {
    actualQuizId.value = question.id;
    trackingTime.start();
  };

  const onChangeQuestion = (question: QuestionItem) => {
    trackingTime.finish();
    actualQuizId.value = question.id;
    trackingTime.start();
  };

  /// Research should app track time for question if question was checked

  /// Put this code on composable END
</script>

<template>
  <VAlert>
    {{ trackingTime }}
  </VAlert>
  <VCard rounded="small">
    <QuizResult
      :module-id="quizStore.activeModuleId"
      :questions="finishedQuestions"
      :quiz-type="quizStore.currentType"
      @retry="onRetry"
    />
    <template #text>
      <div class="pb-4">
        <DynamicQuiz
          :key="quizKey"
          :questions="quizStore.words"
          :quiz-type="quizStore.currentType"
          @change-question="onChangeQuestion"
          @finished="onFinishedQuiz"
          @init="initQuiz"
        >
          <template #controls="{ finish, reset }">
            <QuizControls
              @finish="finish"
              @restart="reset"
            />
          </template>
        </DynamicQuiz>
      </div>
    </template>
  </VCard>
</template>
