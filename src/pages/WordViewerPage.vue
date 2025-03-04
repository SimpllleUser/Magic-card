<script lang="ts" setup>
  import { ref } from 'vue';
  import { shuffle } from 'lodash';
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import WordCard from '@/shared/ui/WordCard.vue';
  import WordSlider from '@/shared/ui/WordSlider.vue';
  import { DictionaryItem } from '@/features/dictionary/model/types';
  import { useQuizsStore } from '@/stores/quiz';
  import ButtonCopy from '@/shared/ui/WordButtonActions/ButtonCopy.vue';
import ButtonVoice from '@/shared/ui/WordButtonActions/ButtonVoice.vue';

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
      <template
        #header="{ titleSlide }"
        name="header"
      >
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
            :flipped="isFlipped"
            :word="word"
            @flipp="setFliped"
            class="pb-4"
          />
        </div>
      </template>
    </WordSlider>
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
