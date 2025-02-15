<script setup lang="ts">
  import { DictionaryItem } from '@/core/models/Topic';
  import { QuestionItem } from './useQuize';
  import { Colors } from '@/core/models/enums';
  import { useMissingLettersQuiz } from './useMissingLettersQuiz';
  import { VOtpInput } from 'vuetify/components';

  interface Emits {
    (event: 'finished', payload: QuestionItem[]): void;
  }

  const props = withDefaults(defineProps<{ questions: DictionaryItem[] }>(), {
    questions: () => []
  });

  const emit = defineEmits<Emits>();

  const { setAnswer, reset, getQuestion, actualQuestionIndex, questions } = useMissingLettersQuiz([
    ...props?.questions
  ]);

  const titleCard = computed(() => `${actualQuestionIndex.value + 1}/${questions.value.length}`);

  const toFinishQuiz = () => {
    emit('finished', questions.value);
  };
</script>

<template>
  <div>
    <VCarousel v-model="actualQuestionIndex" height="20rem" hide-delimiters>
      <VCarouselItem v-for="(question, index) in questions" :key="index">
        <VCard class="question-card" :title="titleCard">
          <VCardText class="d-flex justify-center py-10">
            <div class="text-h3">{{ getQuestion(question.to) }}</div>
          </VCardText>
          <VCardText class="d-flex justify-center py-10">
            <div>
              <VOtpInput
                v-model="question.answer"
                :length="question.from.length"
                :min-width="question.from.length * 50"
                type="text"
                @update:model-value="setAnswer(question, $event)"
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
