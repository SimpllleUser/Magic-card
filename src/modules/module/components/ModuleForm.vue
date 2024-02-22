<script setup lang="ts">
  import { ref } from 'vue';
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VForm/VInput/VInput.vue';

  import { useForm } from 'components/VForm/composables/useForm';

  const name = ref('');
  // const flag = ref(false);
  // const select = ref(3);

  const { formData, onSubmit, onReset } = useForm({
    name: {
      value: 'Some name',
      rules: ['alpha_spaces']
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
      <q-btn @click="onSave">Save</q-btn>
      <q-btn @click="onsReset">Reset</q-btn>
    </div>
  </v-modal>
</template>

<style scoped></style>
