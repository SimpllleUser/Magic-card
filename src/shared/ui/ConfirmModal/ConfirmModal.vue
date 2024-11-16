<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Icons } from '@/core/models/icons';
  import { Colors, Variants } from '@/core/models/enums';
  import { useModalStore } from '../BaseModal/store';
  import { ConfirmModalContent, ModalParams, Props } from './types';

  interface Emits {
    (event: 'show'): void;
    (event: 'hide'): void;
  }

  enum EmitActions {
    Show = 'show',
    Hide = 'hide'
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const additinalParams = ref<ModalParams>({
    title: '',
    description: ''
  });

  const modalContent = computed(
    (): ConfirmModalContent => ({
      title: props.title || additinalParams.value.title || '',
      description: props.description || additinalParams.value.description || '',
      cancelBtn: additinalParams.value.cancelBtn || { variant: Variants.Outlined, color: Colors.Secondary },
      confirmBtn: additinalParams.value.confirmBtn || { variant: Variants.Flat, color: Colors.Primary }
    })
  );

  const state = ref(false);
  const show = (params?: ModalParams) => {
    state.value = true;
    if (params) {
      additinalParams.value = params;
    }
  };
  const hide = () => {
    state.value = false;
  };

  const { initModal } = useModalStore();
  onMounted(() => initModal(props.id, { hide, show }));

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
      <VCardTitle class="d-flex hide-center justify-space-between bg-primary text-white">
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
          <VBtn v-bind="modalContent.cancelBtn">Cancel</VBtn>
          <VBtn class="ml-4" v-bind="modalContent.confirmBtn">Confirm</VBtn>
        </div>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
