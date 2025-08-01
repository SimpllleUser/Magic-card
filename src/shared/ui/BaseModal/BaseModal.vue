<script lang="ts" setup>
  import { defineEmits, useAttrs } from 'vue';
  import { Icons } from '@/core/models/icons';
  import { Variants } from '@/core/models/enums';
  import { EmitActions, Emits, Props } from './types';
  import { useModalState } from './composable';

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const attrs = useAttrs();

  const { state, show, hide } = useModalState(props.id);

  const initActions = (action: CallableFunction, emitName: EmitActions) => () => {
    action && action();
    emitName && emit(emitName);
  };

  const modalHide = initActions(hide, EmitActions.Hide);
  const modalShow = initActions(show, EmitActions.Show);

  const isTest = process.env.TEST;
</script>

<template>
  <VDialog
    v-if="state"
    v-model="state"
    :attach="true"
    v-bind="attrs"
    :class="`base-modal ${id}`"
    data-testId="base-modal-wrapper"
    :max-width="attrs?.maxWidth || '700px'"
    @hide="modalHide"
    @show="modalShow"
  >
    <VCard>
      <VCardTitle
        class="base-modal__title d-flex hide-center text-wrap justify-space-between align-center bg-surface-light"
      >
        <slot
          :close="modalHide"
          name="header"
          :title="title"
        >
          <span data-testId="base-modal-title">{{ title }}</span>
          <VBtn
            :icon="Icons.Close"
            :variant="Variants.Plain"
            @click="modalHide"
          />
        </slot>
      </VCardTitle>
      <VCardText class="base-modal__body">
        <slot :hide="modalHide"></slot>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
  .base-modal {
    &__title {
      position: sticky;
      top: 0;
      z-index: 10;
    }
  }
</style>
