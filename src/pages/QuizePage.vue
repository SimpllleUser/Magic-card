<script setup lang="ts">
  import * as uuid from 'uuid';
  import { Modals } from '@/core/models/modals';
  import { QuestionItem } from '@/features/quiz/model/composables/useSelectWord';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import QuizResult from '@/features/quiz/ui/QuizResult.vue';
  import DynamicQuiz from '@/features/quiz/ui/DynamicQuiz.vue';
  import { useQuizsStore } from '@/stores/quiz';
  import QuizControls from '@/features/quiz/ui/QuizControls.vue';

  const quizStore = useQuizsStore();
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
