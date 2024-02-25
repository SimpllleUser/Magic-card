<script setup lang="ts">
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VForm/VInput/VInput.vue';
  import VForm from 'components/VForm/_index.vue';

  import { useForm } from 'components/VForm/composables/useForm';
  import { ActionForm, ValidationRule } from 'components/VForm/types';
  import { useModulesStore } from 'src/modules/module/store/modules';
  import { EntityUnform } from 'boot/types';
  import { IModule } from 'src/modules/module/types';

  const moduleStore = useModulesStore();

  const initialData = {
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

  const form = useForm({ ...initialData });
  const { formData } = form;

  const onSubmit = (data: EntityUnform<IModule>, action: CallableFunction) => {
    moduleStore.create(data);
    action();
  };
</script>

<template>
  <v-modal id="form-module" title="Module form">
    <template #default="{ hide }">
      <VForm :action="ActionForm.Create" :config="form" @on-submit="onSubmit($event, hide)">
        <VInput v-model="formData.title" />
        <VInput v-model="formData.description" type="textarea" />
      </VForm>
    </template>
  </v-modal>
</template>

<style scoped></style>
