<script setup lang="ts">
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VForm/VInput/VInput.vue';

  import { useForm } from 'components/VForm/composables/useForm';
  import { ValidationRule } from 'components/VForm/types';

  const { formData, onSubmit, onReset } = useForm({
    title: {
      value: '',
      rules: [ValidationRule.Required]
    },
    description: {
      value: '',
      rules: [ValidationRule.Required]
    }
  });

  const onSave = () => {
    onSubmit();
  };
  const onsReset = () => {
    onReset();
  };
</script>

<template>
  <v-modal id="form-module" title="Module form">
    <div>
      <VInput v-model="formData.name" />
      <VInput v-model="formData.name" type="textarea" />
      <q-btn @click="onSave">Save</q-btn>
      <q-btn @click="onsReset">Reset</q-btn>
    </div>
  </v-modal>
</template>

<style scoped></style>
