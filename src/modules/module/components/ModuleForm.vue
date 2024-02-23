<script setup lang="ts">
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VForm/VInput/VInput.vue';

  import { useForm } from 'components/VForm/composables/useForm';
  import { ValidationRule } from 'components/VForm/types';
  import { useModulesStore } from 'src/modules/module/store/modules';

  const moduleStore = useModulesStore();

  const initialData = {
    title: {
      value: '',
      rules: [ValidationRule.Required]
    },
    description: {
      value: '',
      rules: [ValidationRule.Required]
    }
  };

  const { formData, onSubmit, onReset, formDataValue, isValid } = useForm({ ...initialData });

  const onSave = (action: CallableFunction) => {
    onSubmit();
    if (!isValid.value) return;
    moduleStore.create(formDataValue.value);
    action();
  };
  const onsReset = () => {
    onReset();
  };
</script>

<template>
  <v-modal id="form-module" title="Module form">
    <template #default="{ hide }">
      <div>
        <VInput v-model="formData.title" />
        <VInput v-model="formData.description" type="textarea" />
        <q-btn @click="onSave(hide)" :disable="!isValid">Save</q-btn>
        <q-btn @click="onsReset">Reset</q-btn>
      </div>
    </template>
  </v-modal>
</template>

<style scoped></style>
