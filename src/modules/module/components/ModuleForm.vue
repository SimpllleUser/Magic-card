<script setup lang="ts">
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VForm/VInput/VInput.vue';

  import { useForm } from 'components/VForm/composables/useForm';
  import { ValidationRule } from 'components/VForm/types';
  import { useModulesStore } from 'src/modules/module/store/modules';

  const moduleStore = useModulesStore();

  const initialData = {
    title: {
      value: 'TITLE',
      rules: [ValidationRule.Required]
    },
    description: {
      value: 'DESCRIPTION',
      rules: [ValidationRule.Required]
    }
  };

  const { formData, onSubmit, onReset, formDataValue } = useForm({ ...initialData });

  const onSave = () => {
    onSubmit();
    moduleStore.create(formDataValue.value);
  };
  const onsReset = () => {
    onReset();
  };
</script>

<template>
  <v-modal id="form-module" title="Module form">
    <div>
      <VInput v-model="formData.title" />
      <VInput v-model="formData.description" type="textarea" />
      <q-btn @click="onSave">Save</q-btn>
      <q-btn @click="onsReset">Reset</q-btn>
    </div>
  </v-modal>
</template>

<style scoped></style>
