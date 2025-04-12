<script setup lang="ts">
  import { Colors } from '@/core/models/enums';

  defineEmits<{
    (event: 'restart'): void;
    (event: 'finish'): void;
  }>();
</script>

<template>
  <div class="d-flex justify-center pt-12">
    <VBtn
      class="mr-4"
      :color="Colors.Primary"
      @click="$emit('restart')"
      >Restart</VBtn
    >
    <VBtn
      :color="Colors.Primary"
      @click="$emit('finish')"
      >Finish</VBtn
    >
  </div>
</template>
