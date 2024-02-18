<script setup lang="ts">
  import { computed, ref } from 'vue';
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VInput/VInput.vue';
  import { useValidationInput } from 'components/VInput/useValidationInput';

  import validationRules from 'components/VForm/validationRules';

  const validationInput = useValidationInput([]);

  const { rules } = validationRules;

  const name = ref('');
  const flag = ref(false);
  const select = ref(3);
  const canShowError = ref(false);

  const getRules = (keys: Array<string>): Array<any> =>
    keys.map((key) => (canShowError.value ? rules[key] : () => true));

  const formData = ref({
    name: {
      value: 'Some name',
      rules: computed(() => getRules(['required', 'alpha_spaces']))
    }
  });
  const onSave = () => {
    canShowError.value = true;
  };
  const onsReset = () => {
    canShowError.value = false;
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
