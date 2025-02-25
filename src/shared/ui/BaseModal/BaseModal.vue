<script lang="ts" setup>
  import { Icons } from '@/core/models/icons';
  import { Variants } from '@/core/models/enums';
  import { EmitActions, Emits, Props } from './types';
  import { useModalState } from './composable';

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const { state, show, hide } = useModalState(props.id);

  const initActions = (action: CallableFunction, emitName: EmitActions) => () => {
    action && action();
    emitName && emit(emitName);
  };

  const modalHide = initActions(hide, EmitActions.Hide);
  const modalShow = initActions(show, EmitActions.Show);
</script>

<template>
  <VDialog v-model="state" v-bind="$attr" max-width="700px" @hide="modalHide" @show="modalShow">
    <VCard>
      <VCardTitle class="d-flex hide-center justify-space-between bg-surface-light">
        <slot :close="modalHide" name="header" :title="title">
          <span>{{ title }}</span>
          <VBtn :icon="Icons.Close" :variant="Variants.Plain" @click="modalHide" />
        </slot>
      </VCardTitle>
      <VCardText>
        <slot :hide="modalHide"></slot>
      </VCardText>
    </VCard>
  </VDialog>
</template>
