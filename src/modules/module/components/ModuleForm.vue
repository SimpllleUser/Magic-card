<script setup lang="ts">
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VInput/VInput.vue';
  import { ref } from 'vue';

  const test = ref('');
</script>

<template>
  <v-modal id="form-module" title="Module form">
    <div>
      <VInput v-model="test" />
    </div>
  </v-modal>
</template>

<style scoped></style>
