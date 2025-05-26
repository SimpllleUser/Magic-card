<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useQuizStore } from '@/stores/quiz';
  import { QUIZ_TYPES_OPTIONS } from '@/features/quiz/model/constants';
  import DynamicQuiz from '@/features/quiz/ui/DynamicQuiz.vue';
  import { QuizType } from '@/features/quiz/model/types';
  import { Icons } from '@/core/models/icons';
import { Colors, Variants } from '@/core/models/enums';

  const quizStore = useQuizStore();

  const key = ref(Date.now());

  function restartQuiz() {
    quizStore.initQuizFlowSession(quizStore.words);
    key.value = Date.now();
  }

  onMounted(() => {
    quizStore.initQuizFlowSession(quizStore.words);
  });

  const stepperItems = computed(() => QUIZ_TYPES_OPTIONS.map((item) => item.title));
  const quizTypeByStep = computed(() => Object.values(QuizType)[quizStore.quizFlowSession.step - 1]);
  const onFinish = (value) => {
    console.log('Quiz finished with answers:', value);
  };
</script>

<template>
  <div class="quiz-flow-page">
    <VCard class="mb-4">
      <VCardTitle class="d-flex justify-space-between align-center">
        <div class="text-h5">Quiz Flow</div>
        <div>
          <VBtn
            :color="Colors.Primary"
            :variant="Variants.Outlined"
            @click="restartQuiz"
            :icon="Icons.Refresh"
          />
        </div>
      </VCardTitle>
    </VCard>
    <div>
      <VStepper
        v-model="quizStore.quizFlowSession.step"
        alt-labels
        :items="stepperItems"
      >
        <template #item>
          <VCard>
            <DynamicQuiz
              :key="key"
              :questions="quizStore.getChunkOfWordsByStep(quizStore.quizFlowSession.step)"
              :quiz-type="quizTypeByStep"
              :slider-config="{ infinitySlide: false }"
              @finished="onFinish"
            />
          </VCard>
        </template>
      </VStepper>
    </div>
  </div>
</template>
