<script lang="ts" setup>
  import { useModulesStore } from 'src/modules/module/store/modules';
  import { computed } from 'vue';
  import VModal from 'components/VModal.vue';
  import { useModal } from 'src/composables/useModal';

  const modulesStore = useModulesStore();

  const listOfModules = computed(() => modulesStore.modules);

  const testModal = useModal('test');
</script>

<template>
  <div>
    <h4>Modules list</h4>
    {{ listOfModules }}
  </div>
</template>

<style scoped></style>
