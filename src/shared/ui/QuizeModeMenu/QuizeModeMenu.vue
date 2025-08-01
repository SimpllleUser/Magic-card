<script lang="ts" setup>
  import { Colors, Variants } from '@/core/models/enums';
  import { QUIZ_TYPES_OPTIONS } from '@/features/quiz/model/constants';
  import { QuizType } from '@/features/quiz/model/types';
  import { Icons } from '@/core/models/icons';
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
        :append-icon="Icons.ChevronDown"
        :class="{ 'w-100': isMobile}"
        :color="color"
        :disabled="disabled"
        :variant="variant"
        v-bind="props"
      >
        <slot name="label">
          {{ label }}
        </slot>
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
