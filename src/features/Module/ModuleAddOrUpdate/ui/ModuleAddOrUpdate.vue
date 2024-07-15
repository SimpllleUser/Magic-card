<script setup lang="ts">
  import { toRefs } from 'vue';
  import { IModule } from 'src/features/module/types/module';
  import { VModal } from 'src/shared/ui/VModal';
  import { VForm, FormInput } from 'src/shared/ui/VForm';
  import { useModuleAddOrUpdate } from 'src/features/module/ModuleAddOrUpdate/model';
  import WordsForm from 'src/features/words/components/WordsForm.vue';

  interface Props {
    module?: IModule;
    formId: string;
  }

  interface Emits {
    (event: 'hide'): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const { form, wordsList, formAction, initDataModule, onSubmitModule } = toRefs(
    useModuleAddOrUpdate(props.module || {})
  );

  const onHide = () => {
    emit('hide');
  };
</script>
<template>
  <VModal :id="formId" title="Module form" @show="initDataModule(module)" @hide="onHide">
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
