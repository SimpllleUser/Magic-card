<script lang="ts" setup>
  import { defineEmits, defineProps, ref } from 'vue';
  import { Icons } from '@/core/models/icons';
  import { Colors, Variants } from '@/core/models/enums';
  import { ConfirmModalContent, ModalParams, Props } from './types';
  import { useModalState } from '../BaseModal/composable';

  interface Emits {
    (event: 'show'): void;
    (event: 'hide'): void;
    (event: 'hide'): void;
    (event: 'confirm'): void;
  }

  enum EmitActions {
    Show = 'show',
    Hide = 'hide',
    Cancel = 'cancel',
    Confirm = 'confirm'
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const additionalParams = ref<ModalParams>({
    title: '',
    description: ''
  });

  const modalContent = computed(
    (): ConfirmModalContent => ({
      title: props.title || additionalParams.value.title || '',
      description: props.description || additionalParams.value.description || '',
      cancelBtn: additionalParams.value.cancelBtn || { variant: Variants.Outlined, color: Colors.Primary },
      confirmBtn: additionalParams.value.confirmBtn || { variant: Variants.Flat, color: Colors.Primary },
      type: additionalParams.value.type || Colors.Primary
    })
  );

  const onShow = (params: ModalParams) => {
    additionalParams.value = params;
  };

  const { state, show, hide } = useModalState(props.id, { onShow });

  const initActions = (action: CallableFunction, emitName: EmitActions) => () => {
    action && action();
    emitName && emit(emitName);
  };

  const modalHide = initActions(hide, EmitActions.Hide);
  const modalShow = initActions(show, EmitActions.Show);
  const onCancel = initActions(hide, EmitActions.Cancel);
  const onConfirm = initActions(hide, EmitActions.Confirm);
</script>

<template>
  <VDialog v-model="state" v-bind="$attr" max-width="700px" @hide="modalHide" @show="modalShow">
    <VCard>
      <VCardTitle class="d-flex hide-center justify-space-between" :class="`bg-${modalContent.type}`">
        <slot :close="modalHide" name="header" :title="modalContent.title">
          <span>{{ modalContent.title }}</span>
          <VBtn :icon="Icons.Close" :variant="Variants.Plain" @click="modalHide" />
        </slot>
      </VCardTitle>
      <VCardText>
        <slot name="description">
          {{ modalContent.description }}
        </slot>
      </VCardText>
      <VCardActions>
        <div class="d-flex justify-end">
          <VBtn v-bind="modalContent.cancelBtn" @click="onCancel">Cancel</VBtn>
          <VBtn class="ml-4" v-bind="modalContent.confirmBtn" @click="onConfirm">Confirm</VBtn>
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
