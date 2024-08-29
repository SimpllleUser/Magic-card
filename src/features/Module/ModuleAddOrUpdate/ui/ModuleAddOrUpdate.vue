<script setup lang="ts">
  // import { toRefs } from 'vue';
  // import { IModule } from 'src/features/module/types/module';
  import { VModal } from 'src/shared/ui/VModal';
  import { VForm, FormInput } from 'src/shared/ui/VForm';
  // import { useModuleAddOrUpdate } from 'src/features/module/ModuleAddOrUpdate/model';
  // import { WordsForm } from 'src/widgets/Words/WordsForm';
  import { ModuleForm } from 'src/features/Module/ModuleAddOrUpdate/model/ModuleForm';
  import { ActionForm, OnSubmitPayload } from 'base-form/src/shared/ui/form/BaseForm';

  interface Props {
    formId: string;
  }

  interface Emits {
    (event: 'hide'): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  // const { form, wordsList, formAction, initDataModule, onSubmitModule } = toRefs(
  //   useModuleAddOrUpdate(props.module || {})
  // );

  const onHide = () => {
    emit('hide');
  };

  const onSubmit = (params: OnSubmitPayload<unknown>) => {
    console.log(params.value, props);
  };

  const useEntity = () => new ModuleForm();
</script>
<template>
  <VModal :id="formId" title="Module form" @hide="onHide">
    <template #default="{ hide }">
      <VForm
        :config="useEntity()"
        :params="{
          action: ActionForm.Create
        }"
        @on-submit="onSubmit"
      >
        <template #default="{ form }: { form: ModuleForm }">
          <div class="q-pa-md">
            <div class="col">
              <FormInput v-model="form.title" />
            </div>
            <div class="row">
              <div class="col">
                <FormInput v-model="form.description" />
              </div>
            </div>
            <button @click="hide">Close</button>
            <!--          <div class="row full-width">-->
            <!--            <WordsForm v-model="wordsList" />-->
            <!--          </div>-->
          </div>
        </template>
      </VForm>
    </template>
  </VModal>
</template>

<style lang="scss" scoped>
  @import 'styles';
</style>
