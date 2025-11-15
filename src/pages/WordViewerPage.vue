<script lang="ts" setup>
  import { MemoryTips } from '@/features/aiMemory';
  import { ref } from 'vue';
  import { shuffle } from 'lodash';
  import { Colors, Icons, Variants } from '@/core';
  import { DictionaryItem } from '@/features/dictionary';
  import { ButtonCopy, ButtonVoice, WordCard, WordSlider } from '@/shared';
  import { useQuizStore } from '@/stores/quiz';

  const quizStore = useQuizStore();
  const isFlipped = ref(false);

  const setFlipped = (state: boolean) => {
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
    setFlipped(false);
  };

  const actualCopyWord = computed(() => {
    const keys = ['from', 'to'];
    return words.value[currentWordIndex.value][isFlipped.value ? keys[1] : keys[0]];
  });
</script>

<template>
  <div class="position-relative view-mode-wrapper">
    <WordSlider
      :words="words"
      @change-slide="onChangeSlide"
    >
      <template #header="{ titleSlide }">
        <div class="d-flex justify-space-between align-center">
          <div class="title-card text-surface-variant-text">{{ titleSlide }}</div>
          <div>
            <ButtonVoice :value="actualCopyWord" />
            <ButtonCopy :value="actualCopyWord" />

            <VBtn
              :color="Colors.Primary"
              :icon="Icons.Shuffle"
              :variant="Variants.Plain"
              @click="shuffleWords"
            ></VBtn>
          </div>
        </div>
      </template>
      <template #default="{ word }">
        <div class="word-card--wrapper">
          <WordCard
            class="pb-4"
            :flipped="isFlipped"
            :word="word"
            @flipp="setFlipped"
          />
        </div>
      </template>
    </WordSlider>
    <div class="pt-2">
      <MemoryTips :word="words[currentWordIndex]?.from" />
    </div>
  </div>
</template>

<style scoped>
  .word-card--wrapper {
    height: 10rem;
  }
  .view-mode-wrapper {
    height: 100%;
    width: 100%;
  }
</style>
