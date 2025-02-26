<script lang="ts" setup>
  import { ref } from 'vue';
  import { shuffle } from 'lodash';
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import WordCard from '@/shared/ui/WordCard.vue';
  import WordSlider from '@/shared/ui/WordSlider.vue';
  import { DictionaryItem } from '@/features/dictionary/model/types';
  import { useQuizsStore } from '@/stores/quiz';

  const quizStore = useQuizsStore();
  const isFlipped = ref(false);

  const setFliped = (state: boolean) => {
    isFlipped.value = state;
  };

  const currentWordIndex = ref(0);

  const words = ref<DictionaryItem>([]);

  const shuffleWords = () => {
    words.value = shuffle(words.value);
  };

  onMounted(() => {
    words.value = quizStore.words;
  });

  const onChangeSlide = (index: number) => {
    currentWordIndex.value = index;
    setFliped(false);
  };
</script>

<template>
  <div class="position-relative view-mode-wrapper">
    <WordSlider :words="words" @change-slide="onChangeSlide">
      <template #header="{ titleSlide }" name="header">
        <div class="d-flex justify-space-between align-center">
          <div class="title-card text-surface-variant-text">{{ titleSlide }}</div>
          <div>
            <VBtn :color="Colors.Primary" :icon="Icons.Shuffle" :variant="Variants.Plain" @click="shuffleWords"></VBtn>
          </div>
        </div>
      </template>
      <template #default="{ word }">
        <div style="height: 19rem">
          <WordCard :flipped="isFlipped" :word="word" @flipp="setFliped" />
        </div>
      </template>
    </WordSlider>
  </div>
</template>

<style scoped>
  .view-mode-wrapper {
    height: 100%;
    width: 100%;
  }
</style>
