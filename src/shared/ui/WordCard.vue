<script lang="ts" setup>
  import { DictionaryItem } from '@/features/dictionary/model/types';
  import { getWord } from '../../features/quiz/model/utils';

  const emits = defineEmits<{
    (event: 'flipp', payload: boolean): void;
  }>();

  const props = defineProps<{
    word: DictionaryItem;
    flipped: boolean;
  }>();

  const toggleFlip = () => {
    emits('flipp', !props.flipped);
  };
</script>

<template>
  <div
    class="flip-container"
    :class="{ flipped }"
    @click="toggleFlip"
  >
    <div class="flipper text-center">
      <div class="flip-card front">
        <div class="d-flex flex-column align-center justify-center">
          <h3 class="text-h3 mt-2 font-weight-bold">{{ getWord(word.from) }}</h3>
        </div>
      </div>

      <div class="flip-card back">
        <div class="d-flex flex-column align-center justify-center">
          <h3 class="text-h3 mt-2 font-weight-bold">{{ getWord(word.to) }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  }
</style>
