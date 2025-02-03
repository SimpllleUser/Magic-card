<script setup lang="ts">
  import { Modals } from '@/core/models/modals';
  import Quize from '@/features/Play/Quize/Quize.vue';
  import { QuestionItem } from '@/features/Play/Quize/useQuize';
  import { useQuizsStore } from '@/features/Play/store/quiz';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import BaseModal from '@/shared/ui/BaseModal/BaseModal.vue';
  import QuizResult from '@/features/Play/Quize/QuizResult.vue';

  const quizeStore = useQuizsStore();
  const modal = useModalStore();
  const finishedQuestions = ref<QuestionItem[]>([]);

  const onFisnishedQuiz = (questions: QuestionItem[]) => {
    finishedQuestions.value = questions;
    modal.show(Modals.FinishQuiz);
  };
</script>
<template>
  <div class="py-4">
    <BaseModal :id="Modals.FinishQuiz" title="Result of quiz!">
      <QuizResult :questions="finishedQuestions" />
    </BaseModal>
    <Quize :questions="quizeStore.words" @finished="onFisnishedQuiz" />
  </div>
</template>
<style></style>
