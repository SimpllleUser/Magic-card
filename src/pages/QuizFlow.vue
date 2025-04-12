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
  const quizTypeByStep = computed(() => Object.values(QuizType)[quizStore.quizFlowSession.step - 1]);
</script>

<template>
  <div class="quiz-flow-page">
    <div>
      <VStepper
        v-model="quizStore.quizFlowSession.step"
        alt-labels
        :items="stepperItems"
      >
        <template #item>
          <VCard>
            <DynamicQuiz
              :questions="quizStore.getChunkOfWordsByStep(quizStore.quizFlowSession.step)"
              :quiz-type="quizTypeByStep"
              :slider-config="{ infinitySlide: false }"
            />
          </VCard>
        </template>
      </VStepper>
    </div>
  </div>
</template>
