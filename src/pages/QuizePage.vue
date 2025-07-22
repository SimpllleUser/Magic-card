<script setup lang="ts">
  import * as uuid from 'uuid';
  import { Modals } from '@/core/models/modals';
  import { QuestionItem } from '@/features/quiz/model/composables/useSelectWord';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import QuizResult from '@/features/quiz/ui/QuizResult.vue';
  import DynamicQuiz from '@/features/quiz/ui/DynamicQuiz.vue';
  import { useQuizStore } from '@/stores/quiz';
  import QuizControls from '@/features/quiz/ui/QuizControls.vue';
  import { useTrackingTime } from '@/features/quiz/model/composables/useTrackingTime';

  const quizStore = useQuizStore();
  const trackingTimeQuiz = useTrackingTime();
  const trackingTimeQuestion = useTrackingTime();
  const modal = useModalStore();

  const finishedQuestions = ref<QuestionItem[]>([]);

  const onFinishedQuiz = (questions: QuestionItem[]) => {
    finishedQuestions.value = questions;
    modal.show(Modals.FinishQuiz);
    const timeOfQuiz = trackingTimeQuiz.getResult();
    const timeOfQuestions = trackingTimeQuestion.getResult();
    console.log({
      timeOfQuiz,
      timeOfQuestions
    });
    trackingTimeQuiz.reset();
    trackingTimeQuestion.reset();
  };

  const quizKey = ref(uuid.v4());

  const onRetry = () => {
    quizKey.value = uuid.v4();
    trackingTimeQuiz.reset();
    trackingTimeQuestion.reset();
    trackingTimeQuiz.initTime(quizStore.activeModuleId);
  };

  const onChangeQuestion = (question: QuestionItem) => {
    trackingTimeQuestion.changeRecordingItem(question.id);
  };

  const iniDynamicQuiz = (actualQuestion: QuestionItem) => {
    trackingTimeQuestion.initTime(actualQuestion.id);
  };

  onMounted(() => {
    trackingTimeQuiz.initTime(quizStore.activeModuleId);
  });
</script>

<template>
  <VCard rounded="small">
    {{ trackingTimeQuiz.value }}
    {{ trackingTimeQuiz.getResult() }}
    {{ trackingTimeQuestion.getResult() }}
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
          @init="iniDynamicQuiz"
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
