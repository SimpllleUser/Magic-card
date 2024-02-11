<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useModalStore } from 'stores/modal';
  import { QDialogProps } from 'quasar';

  interface Props extends QDialogProps {
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
