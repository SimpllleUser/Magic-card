<script lang="ts" setup>
  import { defineEmits, defineProps, ref } from 'vue';
  import { Icons, Colors, Variants } from '@/core';
  import { ConfirmModalContent, ModalParams, Props } from './types';
  import { useModalState } from '@/shared';
  import { getIconByColor } from './utils';

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
      icon: getIconByColor(props.type || additionalParams.value.type || Colors.Primary),
      title: props.title || additionalParams.value.title || '',
      description: props.description || additionalParams.value.description || '',
      confirmBtn: additionalParams.value.confirmBtn || { variant: Variants.Flat, color: Colors.Primary },
      cancelBtn: additionalParams.value.cancelBtn || { variant: Variants.Tonal, color: Colors.Primary },
      type: additionalParams.value.type || Colors.Primary
    })
  );

  const onShow = (params: ModalParams) => {
    additionalParams.value = params;
  };

  const { state, show, hide } = useModalState(props.id, { onShow });

  const initActions = (action: CallableFunction, emitName: EmitActions, callback?: CallableFunction) => () => {
    action && action();
    emitName && emit(emitName);
    callback && callback();
  };

  const modalHide = initActions(hide, EmitActions.Hide);
  const modalShow = initActions(show, EmitActions.Show);
  const onCancel = initActions(hide, EmitActions.Cancel);
  const onConfirm = initActions(hide, EmitActions.Confirm, () => {
    additionalParams.value?.onConfirm();
  });
</script>

<template>
  <VDialog
    v-model="state"
    v-bind="$attr"
    max-width="700px"
    @hide="modalHide"
    @show="modalShow"
  >
    <VCard>
      <VCardTitle class="d-flex hide-center align-center justify-space-between">
        <slot
          :close="modalHide"
          name="header"
          :title="modalContent.title"
        >
          <div>
            <VIcon
              :color="modalContent.type"
              :icon="modalContent.icon"
            />
            <span class="ml-4">{{ modalContent.title }}</span>
          </div>
          <VBtn
            :icon="Icons.Close"
            :variant="Variants.Plain"
            @click="modalHide"
          />
        </slot>
      </VCardTitle>
      <VCardSubtitle>
        <slot name="description">
          <div class="py-4">
            {{ modalContent.description }}
          </div>
        </slot>
      </VCardSubtitle>
      <VCardActions>
        <div class="d-flex justify-end ga-4">
          <VBtn
            v-bind="modalContent.confirmBtn"
            @click="onConfirm"
            >Confirm</VBtn
          >
          <VBtn
            v-bind="modalContent.cancelBtn"
            @click="onCancel"
            >Cancel</VBtn
          >
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
