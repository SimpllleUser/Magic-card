<script setup lang="ts">
  import { defineProps, ref, withDefaults } from 'vue';
  import { DictionaryItem } from '@/core/models/Topic';
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { QuestionItem } from '../composables/useSelectWord';

  const props = withDefaults(defineProps<{ words: DictionaryItem[] | QuestionItem[] }>(), {
    words: () => []
  });

  const emit = defineEmits<{
    (event: 'changeSlide', payload: number): void;
  }>();

  const internalIndex = ref(0);

  const titleCard = computed(() => `${internalIndex.value + 1}/${props.words?.length}`);

  watch(
    () => internalIndex.value,
    (value) => {
      emit('changeSlide', value);
    }
  );
</script>

<template>
  <div>
    <VCarousel v-model="internalIndex" height="25rem" hide-delimiters show-arrows="hover">
      <template #prev="{ props }">
        <VBtn :color="Colors.Secondary" :icon="Icons.ChevronLeft" :variant="Variants.Outlined" @click="props.onClick" />
      </template>
      <template #next="{ props }">
        <VBtn
          :color="Colors.Secondary"
          :icon="Icons.ChevronRight"
          :variant="Variants.Outlined"
          @click="props.onClick"
        />
      </template>
      <VCarouselItem v-for="(word, index) in words" :key="index">
        <VCard class="word-card rounded-xl ma-4 bg-surface" :color="Colors.GreyLight">
          <VCardTitle>
            <div class="title-card text-surface-variant-text">{{ titleCard }}</div>
          </VCardTitle>
          <slot :index="index" :word="word"></slot>
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
