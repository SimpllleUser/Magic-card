<script lang="ts" setup>
  import { ref, computed, nextTick } from 'vue';
  import ModuleItem from 'src/modules/module/components/ModuleItem.vue';
  import ModuleForm from 'src/modules/module/components/ModuleForm.vue';

  import { useModulesStore } from 'src/modules/module/store/modules';
  import { useModal } from 'src/composables/useModal';
  import { IModule } from 'src/modules/module/types';

  const moduleStore = useModulesStore();
  const modules = computed(() => moduleStore.modules);

  const editModal = useModal('edit-module');
  const createModule = useModal('create-module');

  const currentModule = ref<IModule | null>(null);

  const setEditModule = (moduleItem: IModule) => {
    currentModule.value = moduleItem;
    nextTick(() => {
      editModal.show();
    });
  };
</script>

<template>
  <div class="q-px-xs">
    <module-form form-id="edit-module" v-if="currentModule" :module="currentModule" />
    <module-form form-id="create-module" />
    <!--    <module-form :module="currentModule" />-->
    <div v-if="modules.length" class="row">
      <div v-for="module in modules" :key="module.id" class="col-4">
        <module-item :module="module" class="q-ma-sm" @on-edit="setEditModule" />
      </div>
    </div>
    <div>
      <div v-if="!modules.length"><h4 class="text-blue-grey-8 text-center">You can add new module</h4></div>
      <div class="row justify-center">
        <div class="col-3 row justify-center">
          <q-btn
            color="secondary"
            text-color="black"
            icon="add"
            style="font-size: 5rem"
            @click="createModule.show"
          ></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
