<script setup lang="ts">
  import { ref, watch } from 'vue';
  import VModal from 'components/VModal.vue';
  import VForm from 'components/VForm/_index.vue';
  // import { useForm } from 'components/VForm/composables/useForm';
  import { useForm } from 'src/shared/ui/VForm/useForm';
  import { ActionForm, ComponentTypes, ValidationRule } from 'components/VForm/types';
  import { useModulesStore } from 'src/modules/module/store/modules';
  import { EntityUnform } from 'boot/types';
  import { IModule } from 'src/modules/module/types';
  import { computed } from 'vue';
  import FormInput from 'components/VForm/VInput/FormInput.vue';
  // import { useCheckbox, useInput } from 'components/VForm/VInput/form-inputs';

  import { useText, useCheck, useInputList } from 'src/shared/ui/VForm/form-inputs';

  interface Props {
    module?: IModule;
    formId: string;
  }

  const props = defineProps<Props>();

  const moduleStore = useModulesStore();

  const getFormInputItem = (item: any): any => {
    return {
      id: item.id,
      name: useText({
        value: item?.name || '',
        label: 'Name',
        rules: [ValidationRule.Required]
      }),
      isChecked: useCheck({
        value: item?.isChecked,
        label: 'Checked'
      })
    };
  };

  const getFormConfig = (data: any): any => {
    return {
      id: data?.id || '',
      title: useText({
        value: data?.title || '',
        label: 'Title',
        rules: [ValidationRule.Required]
      }),
      description: useText({
        value: data?.description || '',
        label: 'Description',
        rules: [ValidationRule.Required]
        // type: 'textarea'
      }),
      items: useInputList({
        value: data?.items ? data?.items?.map(getFormInputItem) : [],
        config: getFormInputItem({})
      })
    };
  };

  const form = ref(useForm(getFormConfig({})));

  const onShowModal = () => {
    if (!props.module?.id) return;
    form.value = useForm(getFormConfig(props.module));
  };

  const onSubmit = (data: EntityUnform<IModule>, action: CallableFunction) => {
    const storeAction = props.module?.id ? moduleStore.update : moduleStore.create;
    storeAction(data);
    form.value.onReset();
    action();
  };

  const formAction = computed((): ActionForm => (props.module?.id ? ActionForm.Edit : ActionForm.Create));
</script>

<template>
  <v-modal :id="formId" title="Module form" @show="onShowModal">
    <template #default="{ hide }">
      <VForm :action="formAction" :config="form" @on-submit="onSubmit($event, hide)" @on-cancel="hide">
        {{ formId }}
        <div class="col">
          <FormInput v-model="form.form.title" />
        </div>
        <div class="row">
          <div class="col">
            <FormInput v-model="form.form.description" />
          </div>
        </div>
        <div class="row">
          <FormInput v-model="form.form.items" />
        </div>
      </VForm>
    </template>
  </v-modal>
</template>

<style scoped></style>
