<script setup lang="ts">
  import * as uuid from 'uuid';
  import { Modals } from '@/core/models/modals';
  import { QuestionItem } from '@/features/quiz/model/composables/useSelectWord';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import QuizResult from '@/features/quiz/ui/QuizResult.vue';
  import DynamicQuiz from '@/features/quiz/ui/DynamicQuiz.vue';
  import { useQuizsStore } from '@/stores/quiz';

  const quizStore = useQuizsStore();
  const modal = useModalStore();
  const finishedQuestions = ref<QuestionItem[]>([]);

  const onFisnishedQuiz = (questions: QuestionItem[]) => {
    finishedQuestions.value = questions;
    modal.show(Modals.FinishQuiz);
  };

  const quizKey = ref(uuid.v4());

  const onRetry = () => {
    quizKey.value = uuid.v4();
  };
</script>

<template>
  <div class="py-4">
    <QuizResult
      :module-id="quizStore.activeModuleId"
      :questions="finishedQuestions"
      :quiz-type="quizStore.currentType"
      @retry="onRetry"
    />
    <DynamicQuiz
      :key="quizKey"
      :questions="quizStore.words"
      :quiz-type="quizStore.currentType"
      @finished="onFisnishedQuiz"
    />
  </div>
</template>
