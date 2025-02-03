<script setup lang="ts">
  import { DictionaryItem } from '@/core/models/Topic';
  import { useQuiz } from './useQuize';
  import { Colors, Variants } from '@/core/models/enums';

  const props = withDefaults(defineProps<{ questions: DictionaryItem[] }>(), {
    questions: []
  });

  const { actualQuestionIndex, setAnswer, reset, getQuestion, actualQuestion, actualVariants, questions } = useQuiz([
    ...props?.questions
  ]);

  const titleCard = computed(() => `${actualQuestionIndex.value + 1}/${questions.value.length}`);
</script>

<template>
  <div>
    <v-carousel v-model="actualQuestionIndex" height="20rem" hide-delimiters>
      <v-carousel-item v-for="(question, index) in questions" :key="index">
        <VCard class="question-card" :title="titleCard">
          <VCardText class="d-flex justify-center py-10">
            <div class="text-h3">{{ getQuestion(question.from) }}</div>
          </VCardText>
          <VCardText class="d-flex justify-center py-10">
            <div>
              <VBtn
                v-for="(variant, index) in actualVariants"
                :key="index"
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
      </v-carousel-item>
    </v-carousel>
  </div>

  <div class="d-flex justify-center">
    <VBtn class="mr-4" @click="reset">Try again</VBtn>
    <VBtn>Finish</VBtn>
  </div>
</template>

<style lang="scss" scoped></style>
