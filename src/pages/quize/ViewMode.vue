<script lang="ts" setup>
  import { ref } from 'vue';
  import { shuffle } from 'lodash';
  import { Colors } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { DictionaryItem } from '@/core/models/Topic';
  import WordCard from '@/features/Play/Quize/components/WordCard.vue';
  import { useQuizsStore } from '@/features/Play/store/quiz';

  const quizStore = useQuizsStore();
  const isFlipped = ref(false);

  const setFliped = (state: boolean) => {
    isFlipped.value = state;
  };

  const currentWordIndex = ref(0);

  const words = ref<DictionaryItem>([]);

  const title = computed(() => {
    return `${currentWordIndex.value + 1}/${words.value.length}`;
  });

  const shuffleWords = () => {
    words.value = shuffle(words.value);
  };

  onMounted(() => {
    words.value = quizStore.words;
  });
</script>

<template>
  <div>
    <VCard>
      <VCardTitle>
        <div class="d-flex justify-space-between align-center">
          <span>
            {{ title }}
          </span>
          <span class="ml-4">
            <VBtn :color="Colors.Secondary" :icon="Icons.Shuffle" @click="shuffleWords"></VBtn>
          </span>
        </div>
      </VCardTitle>
      <VCardText>
        <VCarousel
          v-model="currentWordIndex"
          hide-delimiters
          style="width: 50%; margin: 0 auto"
          @update:model-value="setFliped(false)"
        >
          <VCarouselItem v-for="(word, index) in words" :key="index">
            <WordCard :flipped="isFlipped" :word="word" @flipp="setFliped" />
          </VCarouselItem>
        </VCarousel>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped></style>
