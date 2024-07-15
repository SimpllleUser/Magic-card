<script lang="ts" setup>
  import { computed, onMounted, toRefs } from 'vue';
  import { QDialogProps } from 'quasar';
  import { useVModal } from '../model';

  interface Props extends QDialogProps {
    id: string;
  }

  interface Emits {
    (event: 'show'): void;
    (event: 'hide'): void;
  }

  const props = defineProps<Props & { title: string }>();
  const emit = defineEmits<Emits>();
  const EXCESS_KEY_PROP = 'modelValue';
  const options = computed(() => Object.fromEntries(Object.entries(props).filter(([key]) => key !== EXCESS_KEY_PROP)));

  const vModal = useVModal(emit);

  const { state } = toRefs(vModal);
  const { hide, init } = vModal;

  onMounted(() => init(props.id));
</script>
<template>
  <q-dialog v-model="state" v-bind="options" @hide="emit('hide')">
    <q-card class="q-pa-none" style="min-width: 48rem">
      <q-card-section class="q-pa-sm q-pb-none bg-primary text-white row justify-between">
        <div class="text-h6">{{ title }}</div>
        <QBtn outline dense icon="close" @click="hide" />
      </q-card-section>
      <q-card-section class="q-pa-sm q-pt-none">
        <slot :hide="hide"></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
  @import 'styles';
</style>
