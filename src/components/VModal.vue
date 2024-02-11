<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useModalStore } from 'stores/modal';

  interface QuasarDialogProps {
    modelValue: boolean;
    title?: string;
    message?: string;
    cancel?: string;
    persistent?: boolean;
    ok?: string;
    preventClose?: boolean;
    stackButtons?: boolean;
    separator?: string;
    formProps?: Record<string, any>;
    position?: 'top' | 'right' | 'bottom' | 'left';
    noBackdropDismiss?: boolean;
    noEscDismiss?: boolean;
    noRefocus?: boolean;
    autoClose?: boolean;
    minimized?: boolean;
    maximized?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    square?: boolean;
    flat?: boolean;
    bordered?: boolean;
    elevated?: boolean;
    preventDefaults?: boolean;
    noRouting?: boolean;
    noRouteDismiss?: boolean;
    persistentPlaceholder?: boolean;
    seamless?: boolean;
    [key: string]: any; // Для обработки дополнительных свойств
  }

  interface Props extends QuasarDialogProps {
    id: string;
  }

  const { initModal } = useModalStore();

  const props = defineProps<Props>();
  const state = ref<boolean>(false);
  const EXCESS_KEY_PROP = 'modelValue';
  const options = computed(() => Object.fromEntries(Object.entries(props).filter(([key]) => key !== EXCESS_KEY_PROP)));

  const show = () => {
    state.value = true;
  };
  const hide = () => {
    state.value = false;
  };

  onMounted(() => {
    initModal(props.id, { show, hide });
  });
</script>
<template>
  <q-dialog v-model="state" v-bind="options">
    <q-card>
      <q-card-section>
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
