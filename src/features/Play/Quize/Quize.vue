<script setup lang="ts">
  import { DictionaryItem } from '@/core/models/Topic';
  import { QuestionItem, useQuiz } from './useQuize';
  import { Colors, Variants } from '@/core/models/enums';

  interface Emits {
    (event: 'finished', payload: QuestionItem[]): void;
  }

  const props = withDefaults(defineProps<{ questions: DictionaryItem[] }>(), {
    questions: []
  });

  const emit = defineEmits<Emits>();

  const { setAnswer, reset, getQuestion, actualQuestionIndex, actualQuestion, actualVariants, questions } = useQuiz([
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
            <div class="text-h3">{{ getQuestion(question.from) }}</div>
          </VCardText>
          <VCardText class="d-flex justify-center py-10">
            <div>
              <VBtn
                v-for="(variant, indexVariant) in actualVariants"
                :key="indexVariant"
                :active="actualQuestion.answerId === variant.id"
                class="mx-1"
                :color="Colors.Primary"
                :variant="Variants.Outlined"
                @click="setAnswer(actualQuestion, variant)"
              >
                {{ variant.to }}
              </VBtn>
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
