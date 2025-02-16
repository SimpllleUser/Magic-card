<script setup lang="ts">
  import { DictionaryItem } from '@/core/models/Topic';
  import { QuestionItem } from '../composables/useQuize';
  import { Colors } from '@/core/models/enums';

  import { computed } from 'vue';
  import { QuizeType, useQuizeFactory } from '../composables/useQuizeFactory';

  interface Emits {
    (event: 'finished', payload: QuestionItem[]): void;
  }

  const props = withDefaults(defineProps<{ questions: DictionaryItem[]; quizType: QuizeType }>(), {
    questions: () => [],
    quizType: QuizeType.Words
  });

  const emit = defineEmits<Emits>();

  const { quizComponent, quizLogic } = useQuizeFactory(props.quizType);

  const { setAnswer, reset, getQuestion, actualQuestionIndex, actualQuestion, questions, actualVariants } =
    quizLogic.value([...props.questions]);

  const titleCard = computed(() => `${actualQuestionIndex.value + 1}/${questions.value.length}`);

  const toFinishQuiz = () => {
    emit('finished', questions.value);
    reset();
  };
</script>

<template>
  <div>
    <VCarousel v-model="actualQuestionIndex" height="20rem" hide-delimiters>
      <VCarouselItem v-for="(question, index) in questions" :key="index">
        <VCard class="question-card" :title="titleCard">
          <VCardText class="d-flex justify-center py-10">
            <div class="text-h3">{{ getQuestion(question) }}</div>
          </VCardText>
          <VCardText class="d-flex justify-center py-10">
            <div>
              <component
                :is="quizComponent"
                :actual-question="actualQuestion"
                v-bind="{ actualVariants: actualVariants || [] }"
                @set-answer="setAnswer"
              />
            </div>
          </VCardText>
        </VCard>
      </VCarouselItem>
    </VCarousel>
  </div>

  <div class="d-flex justify-center">
    <VBtn class="mr-4" :color="Colors.Primary" @click="reset">Restart</VBtn>
    <VBtn :color="Colors.Secondary" @click="toFinishQuiz">Finish</VBtn>
  </div>
</template>

<style lang="scss" scoped></style>
