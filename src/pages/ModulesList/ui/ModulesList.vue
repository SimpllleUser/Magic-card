<script lang="ts" setup>
  import { ref, computed, nextTick } from 'vue';
  import ModuleItem from 'src/features/module/components/ModuleItem.vue';
  import { ModuleAddOrUpdate } from 'src/features/module/ModuleAddOrUpdate';
  import { useModal } from 'src/shared/composables/useModal';
  import { IModule } from 'src/features/module/types/module';
  import { MODAL, ModuleDetail } from 'src/features/Module/PrepareToQuize';
  import { useModulesStore } from 'src/entities/Module';
  import { EMPTY_MODULES_TEXT, MODAL_ID } from './constants';

  const moduleStore = useModulesStore();
  const { remove: removeModule } = moduleStore;
  const modules = computed(() => moduleStore.modules);

  const editModal = useModal(MODAL_ID.EDIT_MODULE);
  const createModule = useModal(MODAL_ID.CREATE_MODULE);
  const detailModule = useModal(MODAL.ID);

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
</script>

<template>
  <div class="q-px-xs">
    <ModuleDetail :module="detailViewModule" @hide="resetDetailViewModule" />
    <ModuleAddOrUpdate :form-id="MODAL_ID.EDIT_MODULE" :module="currentModule" @hide="resetDetailViewModule" />
    <ModuleAddOrUpdate :form-id="MODAL_ID.CREATE_MODULE" />
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
        <h4 class="text-blue-grey-8 text-center">{{ EMPTY_MODULES_TEXT }}</h4>
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

<style scoped lang="scss">
  @import './styles.scss';
</style>
