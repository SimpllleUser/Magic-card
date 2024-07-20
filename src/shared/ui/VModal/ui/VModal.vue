<script lang="ts" setup>
  import { computed, onMounted, ref, toRefs } from 'vue';
  import { QDialogProps } from 'quasar';
  import { useModalStore } from '../model/store';

  interface Props extends QDialogProps {
    id: string;
  }

  interface Emits {
    (event: 'show'): void;
    (event: 'hide'): void;
  }

  enum EmitActions {
    Show = 'show',
    Hide = 'hide'
  }

  const props = defineProps<Props & { title: string }>();
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
  <q-dialog v-model="state" v-bind="options" @hide="modalHide" @show="modalShow">
    <q-card class="q-pa-none" style="min-width: 48rem">
      <q-card-section class="q-pa-sm q-pb-none bg-primary text-white row justify-between">
        <div class="text-h6">{{ title }}</div>
        <QBtn outline dense icon="close" @click="modalHide" />
      </q-card-section>
      <q-card-section class="q-pa-sm q-pt-none">
        <slot :hide="modalHide"></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
  @import 'styles';
</style>
