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
  const modal = useModalStore();
  const trackingTimeQuiz = useTrackingTime();

  const finishedQuestions = ref<QuestionItem[]>([]);

  const onFinishedQuiz = (questions: QuestionItem[]) => {
    finishedQuestions.value = questions;
    modal.show(Modals.FinishQuiz);
    console.log(trackingTimeQuiz.getResult());
    trackingTimeQuiz.reset();
  };

  const quizKey = ref(uuid.v4());

  const onRetry = () => {
    quizKey.value = uuid.v4();
    trackingTimeQuiz.reset();
    trackingTimeQuiz.initTime(quizStore.activeModuleId);
  };

  onMounted(() => {
    trackingTimeQuiz.initTime(quizStore.activeModuleId);
  });
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
