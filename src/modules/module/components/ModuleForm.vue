<script setup lang="ts">
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VForm/VInput/VInput.vue';
  import VForm from 'components/VForm/_index.vue';

  import { useForm } from 'components/VForm/composables/useForm';
  import { ActionForm, ValidationRule } from 'components/VForm/types';
  import { useModulesStore } from 'src/modules/module/store/modules';
  import { EntityUnform } from 'boot/types';
  import { IModule } from 'src/modules/module/types';
  import { computed } from 'vue';

  interface Props {
    module?: IModule;
    formId: string;
  }

  const props = defineProps<Props>();

  const moduleStore = useModulesStore();

  const formConfig = {
    title: {
      value: '',
      label: 'Title',
      rules: [ValidationRule.Required]
    },
    description: {
      value: '',
      label: 'Description',
      rules: [ValidationRule.Required]
    }
  };
  /// ?CREATE TYPE ITEM FOR INIT OF PROPERTY ITEM FORM

  const form = useForm({ ...formConfig });
  const { formData } = form;

  const onShowModal = () => {
    if (!props.module?.id) return;
    form.updateInputValue(props.module);
  };

  const onSubmit = (data: EntityUnform<IModule>, action: CallableFunction) => {
    const storeAction = props.module?.id ? moduleStore.update : moduleStore.create;
    storeAction(data);
    form.onReset();
    action();
  };

  const formAction = computed((): ActionForm => (props.module?.id ? ActionForm.Edit : ActionForm.Create));
</script>

<template>
  <v-modal :id="formId" title="Module form" @show="onShowModal">
    <template #default="{ hide }">
      <VForm :action="formAction" :config="form" @on-submit="onSubmit($event, hide)" @on-cancel="hide">
        <VInput v-model="formData.title" />
        <VInput v-model="formData.description" type="textarea" />
      </VForm>
    </template>
  </v-modal>
</template>

<style scoped></style>
