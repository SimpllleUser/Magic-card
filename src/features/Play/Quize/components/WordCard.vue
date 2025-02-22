<script lang="ts" setup>
  import { DictionaryItem } from '@/core/models/Topic';
  import { getWord } from '../utils';

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
  <div class="flip-container" :class="{ flipped }" @click="toggleFlip">
    <div class="flipper">
      <VCard class="flip-card front bg-primary">
        <VCardText class="d-flex flex-column align-center justify-center">
          <h3 class="text-h3 mt-2 text-white font-weight-bold">{{ getWord(word.from) }}</h3>
        </VCardText>
      </VCard>

      <VCard class="flip-card back bg-primary">
        <VCardText class="d-flex flex-column align-center justify-center">
          <h3 class="text-h3 mt-2 font-weight-bold">{{ getWord(word.to) }}</h3>
        </VCardText>
      </VCard>
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
    background-color: #f5f5f5;
  }
</style>
