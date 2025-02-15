<script setup lang="ts">
  import * as uuid from 'uuid';
  import { Modals } from '@/core/models/modals';
  import Quize from '@/features/Play/Quize/components/Quize.vue';
  import { QuestionItem } from '@/features/Play/Quize/composables/useQuize';
  import { useQuizsStore } from '@/features/Play/store/quiz';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import QuizResult from '@/features/Play/Quize/components/QuizResult.vue';

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
    <Quize :key="quizeKey" :questions="quizeStore.words" @finished="onFisnishedQuiz" />
  </div>
</template>
<style></style>
