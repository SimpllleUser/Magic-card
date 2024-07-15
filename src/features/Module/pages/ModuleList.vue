<script lang="ts" setup>
  import { ref, computed, nextTick } from 'vue';
  import ModuleItem from 'src/features/module/components/ModuleItem.vue';
  import { ModuleAddOrUpdate } from 'src/features/module/ModuleAddOrUpdate';
  import ModuleDetail from 'src/features/module/components/ModuleDetail.vue';
  import { useModulesStore } from 'src/features/module/store/modules';
  import { useModal } from 'src/shared/composables/useModal';
  import { IModule } from 'src/features/module/types/module';

  const moduleStore = useModulesStore();
  const { remove: removeModule } = moduleStore;
  const modules = computed(() => moduleStore.modules);

  const editModal = useModal('edit-module');
  const createModule = useModal('create-module');
  const detailModule = useModal('detail-module');

  const currentModule = ref<IModule | null>(null);
  const detailViewModule = ref<IModule | null>(null);

  const setEditModule = (moduleItem: IModule) => {
    currentModule.value = moduleItem;
    nextTick(() => {
      editModal.show();
    });
  };

  const setDetailViewModule = (id: string) => {
    detailViewModule.value = moduleStore.getById(id);
    detailModule.show();
  };

  const resetDetailViewModule = () => {
    detailViewModule.value = null;
    currentModule.value = null;
  };

  const _EMPTY_STATE_TITLE = 'You can add new module';
</script>

<template>
  <div class="q-px-xs">
    <ModuleDetail :module="detailViewModule" @hide="resetDetailViewModule" />
    <ModuleAddOrUpdate form-id="edit-module" :module="currentModule" @hide="resetDetailViewModule" />
    <ModuleAddOrUpdate form-id="create-module" />
    <div v-if="modules.length" class="row">
      <div v-for="module in modules" :key="module.id" class="col-4">
        <ModuleItem
          :module="module"
          class="q-ma-sm"
          @on-edit="setEditModule"
          @on-remove="removeModule"
          @view-detail="setDetailViewModule"
        />
      </div>
    </div>
    <div>
      <div v-if="!modules.length">
        <h4 class="text-blue-grey-8 text-center">{{ _EMPTY_STATE_TITLE }}</h4>
      </div>
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
src/features/module/module
