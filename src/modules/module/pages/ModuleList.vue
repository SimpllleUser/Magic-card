<script lang="ts" setup>
  import { computed } from 'vue';
  import ModuleItem from 'src/modules/module/components/ModuleItem.vue';

  import { useModulesStore } from 'src/modules/module/store/modules';

  const moduleStore = useModulesStore();
  const modules = computed(() => moduleStore.modules);
</script>

<template>
  <div class="q-px-xs">
    <div v-if="modules.length" class="row">
      <div v-for="module in modules" :key="module.id" class="col-4">
        <module-item />
      </div>
    </div>
    <div v-else>
      <div><h4 class="text-blue-grey-8 text-center">You can add new module</h4></div>
      <div class="row justify-center">
        <div class="col-3 row justify-center">
          <q-btn color="secondary" text-color="black" icon="add" style="font-size: 5rem"></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
