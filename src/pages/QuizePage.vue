<script setup lang="ts">
  import * as uuid from 'uuid';
  import { Modals } from '@/core/models/modals';
  import QuizResult from '@/features/quiz/ui/QuizResult.vue';
  import DynamicQuiz from '@/features/quiz/ui/DynamicQuiz.vue';
  import QuizControls from '@/features/quiz/ui/QuizControls.vue';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { useQuizStore } from '@/stores/quiz';
  import { useBreakPointsApp } from '@/shared/use/useBreakPointsApp';
  import { QuestionItem } from '@/features/quiz/model/types';


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

  // const onChangeQuestion = (question: QuestionItem) => {
  //   trackingTimeQuestion.changeRecordingItem(question.id);
  // };
  //
  // const iniDynamicQuiz = (actualQuestion: QuestionItem) => {
  //   trackingTimeQuestion.initTime(actualQuestion.id);
  // };

  const { isMobile } = useBreakPointsApp();
</script>

<template>
  <VCard rounded="small">
    <QuizResult
      :module-id="quizStore.activeModuleId"
      :questions="finishedQuestions"
      :type="quizStore.currentType"
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
