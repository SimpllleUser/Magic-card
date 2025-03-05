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

  const isTest = process.env.TEST
</script>

<template>
  <VDialog
  data-testId="base-modal-wrapper"
  v-if="state" :attach="true" v-model="state" v-bind="attrs" max-width="700px" @hide="modalHide" @show="modalShow">
    <VCard>
      <VCardTitle class="d-flex hide-center justify-space-between bg-surface-light">
        <slot :close="modalHide" name="header" :title="title">
          <span data-testId="base-modal-title">{{ title }}</span>
          <VBtn :icon="Icons.Close" :variant="Variants.Plain" @click="modalHide" />
        </slot>
      </VCardTitle>
      <VCardText>
        <slot :hide="modalHide"></slot>
      </VCardText>
    </VCard>
  </VDialog>
</template>
