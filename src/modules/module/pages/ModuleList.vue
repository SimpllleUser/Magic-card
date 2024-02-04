<script lang="ts" setup>
  import { computed } from 'vue';
  import ModuleItem from 'src/modules/module/components/ModuleItem.vue';
  import ModuleForm from 'src/modules/module/components/ModuleForm.vue';

  import { useModulesStore } from 'src/modules/module/store/modules';
  import { useModal } from 'src/composables/useModal';

  const moduleStore = useModulesStore();
  const modules = computed(() => moduleStore.modules);

  const moduleModal = useModal('form-module');
</script>

<template>
  <div class="q-px-xs">
    <module-form />
    <div v-if="modules.length" class="row">
      <div v-for="module in modules" :key="module.id" class="col-4">
        <module-item />
      </div>
    </div>
    <div v-else>
      <div><h4 class="text-blue-grey-8 text-center">You can add new module</h4></div>
      <div class="row justify-center">
        <div class="col-3 row justify-center">
          <q-btn
            color="secondary"
            text-color="black"
            icon="add"
            style="font-size: 5rem"
            @click="moduleModal.show"
          ></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
