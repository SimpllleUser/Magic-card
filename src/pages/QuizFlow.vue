<script setup lang="ts">
  import { useQuizsStore } from '@/stores/quiz';
  import { QUIZ_TYPES_OPTIONS } from '@/features/quiz/model/constants';
  import DynamicQuiz from '@/features/quiz/ui/DynamicQuiz.vue';
  import { QuizType } from '@/features/quiz/model/types';
  /// TODO remove using local store for usual quiz
  const quizStore = useQuizsStore();

  onMounted(() => {
    quizStore.initQuizFlowSession(quizStore.words);
  });

  const stepperItems = computed(() => QUIZ_TYPES_OPTIONS.map((item) => item.title));
  const quizTypeByStep  = computed(() => Object.values(QuizType)[quizStore.quizFlowSession.step - 1])
</script>

<template>
  <div class="quiz-flow-page">
    <div>
      <VStepper
        alt-labels
        v-model="quizStore.quizFlowSession.step"
        :items="stepperItems"
      >
        <template #item>
          <VCard>
            {{data}}
            <DynamicQuiz
              :questions="quizStore.getChunkOfWordsByStep(quizStore.quizFlowSession.step)"
              :quiz-type="quizTypeByStep"
            />
          </VCard>
        </template>
      </VStepper>
    </div>
  </div>
</template>
