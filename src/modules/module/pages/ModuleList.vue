<script lang="ts" setup>
  import { useModulesStore } from 'src/modules/module/store/modules';
  import { computed } from 'vue';

  const modulesStore = useModulesStore();

  const listOfModules = computed(() => modulesStore.modules);
</script>

<template>
  <div>
    <h4>Modules list</h4>
    {{ listOfModules }}
    <q-btn>Add</q-btn>
    <q-btn>Remove</q-btn>
    <q-btn>Update</q-btn>
  </div>
</template>

<style scoped></style>
