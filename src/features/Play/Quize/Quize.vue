<!-- <script lang="ts" setup>
  import { DictionaryItem } from '@/core/models/Topic';

  console.log('!!!');
  const props = withDefaults(defineProps<{ words: DictionaryItem }>(), { words: [] });
</script>
<template>
  <div>!!</div>
</template> -->

<script setup lang="ts">
  import { DictionaryItem } from '@/core/models/Topic';
  import { useQuiz } from './useQuize';
  import { Colors, Variants } from '@/core/models/enums';

  const props = withDefaults(defineProps<{ questions: DictionaryItem }>(), { questions: [] });

  const { nextQuestion, prevQuestion, setAnswer, reset, actualQuestion, actualVariants, shuffledQuestions } = useQuiz(props?.questions);
</script>

<template>
  <div class="d-flex">
    <VBtn @click="prevQuestion">-</VBtn>
    <div class="mx-4 my-auto">{{ actualQuestion.from }}</div>
    <VBtn @click="nextQuestion">+</VBtn>
  </div>
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
  <div>
    <VBtn @click="reset">Try again</VBtn>
    <VBtn>Finish</VBtn>
  </div>
</template>

<style scoped></style>
