<script setup lang="ts">
  import { toRefs } from 'vue';
  import { IModule } from 'src/features/module/types/module';
  import { useModuleAddOrUpdate } from 'src/features/module/ModuleAddOrUpdate/model';
  import VModal from 'src/shared/ui/VModal/VModal.vue';
  import VForm from 'src/shared/ui/VForm/_index.vue';
  import FormInput from 'src/shared/ui/VForm/_components/FormInput.vue';
  import WordsForm from 'src/features/words/components/WordsForm.vue';

  interface Props {
    module?: IModule;
    formId: string;
  }

  const props = defineProps<Props>();
  const { form, wordsList, formAction, initDataModule, onSubmitModule } = toRefs(
    useModuleAddOrUpdate(props.module || {})
  );
</script>
<template>
  <VModal :id="formId" title="Module form" @show="initDataModule(props.module)">
    <template #default="{ hide }">
      <VForm :action="formAction" :config="form" @on-submit="onSubmitModule($event, hide)" @on-cancel="hide">
        <div class="q-pa-md">
          <div class="col">
            <FormInput v-model="form.inputs.title" />
          </div>
          <div class="row">
            <div class="col">
              <FormInput v-model="form.inputs.description" />
            </div>
          </div>
          <div class="row full-width">
            <WordsForm v-model="wordsList" />
          </div>
        </div>
      </VForm>
    </template>
  </VModal>
</template>

<style lang="scss" scoped>
  @import 'styles';
</style>
