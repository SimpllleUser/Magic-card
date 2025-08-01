<script setup lang="ts">
  import { defineProps, ref, withDefaults } from 'vue';
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { QuestionItem } from '../../features/quiz/model/composables/useSelectWord';
  import { DictionaryItem } from '@/features/dictionary/model/types';
  import { useBreakPointsApp } from '@/shared/use/useBreakPointsApp';

  const props = withDefaults(defineProps<{ words: DictionaryItem[] | QuestionItem[]; infinitySlide?: boolean }>(), {
    words: () => [],
    infinitySlide: true
  });

  const emit = defineEmits<{
    (event: 'changeSlide', payload: number): void;
  }>();

  const internalIndex = ref(0);

  const titleSlide = computed(() => `${internalIndex.value + 1}/${props.words?.length}`);

  watch(
    () => internalIndex.value,
    (value) => {
      emit('changeSlide', value);
    }
  );

  const disableNext = computed(() => {
    return props.infinitySlide ? false : internalIndex.value === props.words?.length - 1;
  });

  const disablePrev = computed(() => {
    return props.infinitySlide ? false : internalIndex.value === 0;
  });

  const { isMobile } = useBreakPointsApp();
</script>

<template>
  <div>
    <VCarousel
      v-model="internalIndex"
      height="22rem"
      hide-delimiters
      :show-arrows="!isMobile"
    >
      <template #prev="{ props }">
        <VBtn
          :color="Colors.Secondary"
          :disabled="disablePrev"
          :icon="Icons.ChevronLeft"
          :variant="Variants.Outlined"
          @click="props.onClick"
        />
      </template>
      <template #next="{ props }">
        <VBtn
          :color="Colors.Secondary"
          :disabled="disableNext"
          :icon="Icons.ChevronRight"
          :variant="Variants.Outlined"
          @click="props.onClick"
        />
      </template>
      <VCarouselItem
        v-for="(word, index) in words"
        :key="index"
      >
        <VCard
          class="word-card rounded-xl ma-4 bg-surface"
          :color="Colors.GreyLight"
          style="height: 20rem"
        >
          <VCardTitle>
            <slot
              name="header"
              :title-slide="titleSlide"
            >
              <div class="title-card text-surface-light">{{ titleSlide }}</div>
            </slot>
          </VCardTitle>
          <slot
            :index="index"
            :word="word"
          />
        </VCard>
      </VCarouselItem>
    </VCarousel>
  </div>
</template>

<style lang="scss" scoped>
  .word-card {
    border: 1px solid rgb(var(--v-theme-surface-variant));
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
</style>
