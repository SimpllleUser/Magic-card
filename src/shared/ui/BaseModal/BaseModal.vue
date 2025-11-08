<script lang="ts" setup>
  import { defineEmits, useAttrs } from 'vue';
  import { Icons, Variants } from '@/core';
  import { EmitActions, Emits, Props } from './types';
  import { useModalState } from '@/shared';

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
    :class="`base-modal ${id} ${fullscreen ? 'base-modal--fullscreen' : ''}`"
    data-testId="base-modal-wrapper"
    :fullscreen="fullscreen"
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
  .base-modal--fullscreen {
    .base-modal__title {
      position: relative !important;
      //margin-top: 3.5rem;
    }
  }
</style>
