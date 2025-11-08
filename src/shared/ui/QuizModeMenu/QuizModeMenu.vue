<script lang="ts" setup>
  import { Colors, Icons, Variants } from '@/core';
  import { QUIZ_TYPES_OPTIONS, QuizType } from '@/features/quiz';
  import { Nullable } from 'base-form/src/core/types/common';

  const props = withDefaults(
    defineProps<{
      label?: string;
      color?: Colors;
      variant?: Variants;
      disabled?: boolean;
      isMobile?: boolean;
    }>(),
    {
      color: Colors.Secondary,
      variant: Variants.Elevated,
      disabled: false
    }
  );

  defineEmits<{
    (event: 'select', payload: QuizType): void;
  }>();

  const getStyleOnHover = (isHovering: Nullable<boolean>): Object =>
    isHovering
      ? {
          cursor: 'pointer',
          color: `rgb(var(--v-theme-${props.color}))`,
          backgroundColor: `rgba(var(--v-theme-${props.color}), 0.2)`
        }
      : {};
</script>

<template>
  <VMenu>
    <template #activator="{ props }">
      <VBtn
        :color="color"
        :disabled="disabled"
        :variant="variant"
        v-bind="props"
      >
        <div v-if="!isMobile">
          <span>
            {{ label }}
          </span>
          <span> <VIcon :icon="Icons.ChevronDown" /> </span>
        </div>
        <span v-else>
          <VIcon :icon="Icons.Play" />
        </span>
      </VBtn>
    </template>
    <VList>
      <VHover
        v-for="(item, index) in QUIZ_TYPES_OPTIONS"
        :key="index"
        :value="index"
      >
        <template #default="{ isHovering, props }">
          <VListItem
            class="menu-item"
            :style="getStyleOnHover(isHovering)"
          >
            <VListItemTitle
              v-bind="props"
              @click="$emit('select', item.value)"
            >
              {{ item.title }}
            </VListItemTitle>
          </VListItem>
        </template>
      </VHover>
    </VList>
  </VMenu>
</template>

<style lang="scss" scoped>
  .menu-item {
    transition: all 0.3s ease-in-out;
  }
</style>
