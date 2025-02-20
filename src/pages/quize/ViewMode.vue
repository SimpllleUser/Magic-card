<script lang="ts" setup>
  import { useQuizsStore } from '@/features/Play/store/quiz';
  import { ref } from 'vue';

  const quizStore = useQuizsStore();
  const isFlipped = ref(false);

  const toggleFlip = () => {
    isFlipped.value = !isFlipped.value;
  };

  const currentWordIndex = ref(0);

  const getWord = (word: string): string => word.trimStart().trimEnd();
</script>

<template>
  <div>
    <VCard title="ViewMode">
      <VCardText>
        <VCarousel v-model="currentWordIndex" hide-delimiters style="width: 50%; margin: 0 auto">
          <VCarouselItem v-for="(word, index) in quizStore.words" :key="index">
            <div class="flip-container" :class="{ flipped: isFlipped }" @click="toggleFlip">
              <div class="flipper">
                <VCard class="flip-card front bg-grey-light">
                  <VCardText class="d-flex flex-column align-center justify-center">
                    <h3 class="text-h3 mt-2 text-white">{{ getWord(word.from) }}</h3>
                  </VCardText>
                </VCard>

                <VCard class="flip-card back bg-primary">
                  <VCardText class="d-flex flex-column align-center justify-center">
                    <h3 class="text-h3 mt-2">{{ getWord(word.to) }}</h3>
                  </VCardText>
                </VCard>
              </div>
            </div>
          </VCarouselItem>
        </VCarousel>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped>
  .flip-container {
    margin: 0 auto;
    width: 100%;
    height: calc(100% - 0px);
    perspective: 1000px;
    cursor: pointer;
  }

  .flipper {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
    transform-style: preserve-3d;
  }

  .flip-container.flipped .flipper {
    transform: rotateY(180deg);
  }

  .flip-card {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back {
    transform: rotateY(180deg);
    background-color: #f5f5f5;
  }
</style>
