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

  const onStart = (value: number) => {
    console.log('start with value: ', value);
  };
  const onFinish = (value: number) => {
    console.log('finish with value: ', value);
  };

  const trackingTime = useSecondsCounter(10, {
    onStart,
    onFinish
  });
</script>

<template>
  <div>
    <VBtn @click="trackingTime.start()"> Start </VBtn>
    <VChip>
      {{ trackingTime.value }}
    </VChip>
    <VBtn @click="trackingTime.finish()"> Finish </VBtn>
  </div>
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
