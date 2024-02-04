<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useModalStore } from 'stores/modal';

  interface Props {
    id: string;
  }

  const { initModal } = useModalStore();

  const props = defineProps<Props>();
  const state = ref<boolean>(false);

  const show = () => {
    console.log('show');
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
  <q-dialog v-model="state">
    <slot></slot>
  </q-dialog>
</template>

<style scoped></style>
