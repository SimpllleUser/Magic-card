<script setup lang="ts">
  import * as uuid from 'uuid';
  import { Modals } from '@/core/models/modals';
  import QuizResult from '@/features/quiz/ui/QuizResult.vue';
  import DynamicQuiz from '@/features/quiz/ui/DynamicQuiz.vue';
  import QuizControls from '@/features/quiz/ui/QuizControls.vue';
  import { useBreakPointsApp, useModalStore } from '@/shared';
  import { useQuizStore } from '@/stores/quiz';
  import { QuestionItem } from '@/features/quiz/model/types';
  import { useKnowledgeLevelStore } from '@/stores/knowledge';

  const quizStore = useQuizStore();
  const modal = useModalStore();
  const knowledgeLevelStore = useKnowledgeLevelStore();

  const finishedQuestions = ref<QuestionItem[]>([]);

  const saveKnowledgeLevel = (questions: QuestionItem[]) => {
    questions.forEach((item) => {
      knowledgeLevelStore.updateWord({
        wordId: item.id,
        isCorrect: item.isCorrect,
        quizType: quizStore.currentType
      });
    });
  };

  const onFinishedQuiz = (questions: QuestionItem[]) => {
    finishedQuestions.value = questions;
    saveKnowledgeLevel(finishedQuestions.value);
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
