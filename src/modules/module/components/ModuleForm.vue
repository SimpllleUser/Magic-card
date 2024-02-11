<script setup lang="ts">
  import { computed, ref } from 'vue';
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VInput/VInput.vue';

  const formData = ref({
    name: {
      value: 'Some name',
      rules: [(value: string) => value.length > 3 || 'Less']
    }
  });

  const name = ref('');
  const flag = ref(false);
  const select = ref(3);
</script>

<template>
  <v-modal id="form-module" title="Module form">
    <div>
      <VInput v-model="formData.name" />
    </div>
  </v-modal>
</template>

<style scoped></style>
