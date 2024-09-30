<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useModalStore } from './store';
  import {Icons} from "@/core/models/icons";

  interface Props {
    id: string;
    title: string;
    persistent?: boolean;
    noClickAnimation?: boolean;
    fullscreen?: boolean;
  }

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

  const options = computed(() => Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'modelValue')));

  const state = ref(false);
  const show = () => {
    state.value = true;
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
  <VDialog v-model="state" v-bind="options" max-width="700px" @hide="modalHide" @show="modalShow">
    <VCard>
      <VCardTitle class="d-flex justify-space-between bg-primary text-white">
        <span>{{ title }}</span>
        <VBtn class="text-white" :icon="Icons.Close" @click="modalHide" />
      </VCardTitle>
      <VCardText>
        <slot :hide="modalHide"></slot>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped></style>
