<script setup lang="ts">
  import * as uuid from 'uuid';
  import { Modals } from '@/core/models/modals';
  import { QuestionItem } from '@/features/quiz/model/composables/useSelectWord';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import QuizResult from '@/features/quiz/ui/QuizResult.vue';
  import DynamicQuiz from '@/features/quiz/ui/DynamicQuiz.vue';
  import { useQuizsStore } from '@/stores/quiz';

  const quizeStore = useQuizsStore();
  const modal = useModalStore();
  const finishedQuestions = ref<QuestionItem[]>([]);

  const onFisnishedQuiz = (questions: QuestionItem[]) => {
    finishedQuestions.value = questions;
    modal.show(Modals.FinishQuiz);
  };

  const quizeKey = ref(uuid.v4());

  const onRetry = () => {
    quizeKey.value = uuid.v4();
  };
</script>
<template>
  <div class="py-4">
    <QuizResult :module-id="quizeStore.activeModuleId" :questions="finishedQuestions" @retry="onRetry" />
    <DynamicQuiz
      :key="quizeKey"
      :questions="quizeStore.words"
      :quiz-type="quizeStore.currentType"
      @finished="onFisnishedQuiz"
    />
  </div>
</template>
<style></style>
