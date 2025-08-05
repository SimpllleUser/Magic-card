<script setup lang="ts">
  import * as uuid from 'uuid';
  import { Modals } from '@/core/models/modals';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import QuizResult from '@/features/quiz/ui/QuizResult.vue';
  import DynamicQuiz from '@/features/quiz/ui/DynamicQuiz.vue';
  import { useQuizStore } from '@/stores/quiz';
  import QuizControls from '@/features/quiz/ui/QuizControls.vue';
  import { useTrackingTime } from '@/features/quiz/model/composables/useTrackingTime';
  import { QuestionItem } from '@/features/quiz/model/types';
  import { useDictionaryStatistics } from '@/features/dictionary-statistics/model/useDictionaryStatistics';
  import { useBreakPointsApp } from '@/shared/use/useBreakPointsApp';
  import { DictionaryStatisticPrams } from '@/features/dictionary-statistics';

  const quizStore = useQuizStore();
  const dictionaryStatistics = useDictionaryStatistics();
  const trackingTimeQuiz = useTrackingTime();
  const modal = useModalStore();

  const finishedQuestions = ref<QuestionItem[]>([]);

  const getStatisticParamsFromQuestions = (questions: QuestionItem[], timeOfQuiz): DictionaryStatisticPrams => ({
    dictionaryId: quizStore.activeModuleId,
    correctAnswers: questions.filter((item: QuestionItem) => item.isCorrect).length,
    incorrectAnswers: questions.filter((item) => !item.isCorrect).length,
    totalQuestions: questions.length,
    timeTaken: timeOfQuiz
  });

  const onFinishedQuiz = (questions: QuestionItem[]) => {
    finishedQuestions.value = questions;
    modal.show(Modals.FinishQuiz);
    dictionaryStatistics.saveStatistics(getStatisticParamsFromQuestions(questions, trackingTimeQuiz.value.value));
    trackingTimeQuiz.reset();
  };

  const quizKey = ref(uuid.v4());

  const onRetry = () => {
    quizKey.value = uuid.v4();
    trackingTimeQuiz.reset();
    trackingTimeQuiz.initTime(quizStore.activeModuleId);
  };

  // const onChangeQuestion = (question: QuestionItem) => {
  //   trackingTimeQuestion.changeRecordingItem(question.id);
  // };
  //
  // const iniDynamicQuiz = (actualQuestion: QuestionItem) => {
  //   trackingTimeQuestion.initTime(actualQuestion.id);
  // };

  onMounted(() => {
    trackingTimeQuiz.initTime(quizStore.activeModuleId);
  });
  const { isMobile } = useBreakPointsApp();

</script>

<template>
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
          @finished="onFinishedQuiz"
        >
          <!--          @change-question="onChangeQuestion"-->
          <!--          @init="iniDynamicQuiz"-->
          <template #controls="{ finish, reset }">
            <QuizControls
              :is-mobile="isMobile"
              @finish="finish"
              @restart="reset"
            />
          </template>
        </DynamicQuiz>
      </div>
    </template>
  </VCard>
</template>
