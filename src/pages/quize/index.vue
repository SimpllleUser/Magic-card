<script setup lang="ts">
  import Quize from '@/features/Play/Quize/Quize.vue';
  import { useQuizsStore } from '@/features/Play/store/quiz';

  const quizeStore = useQuizsStore();
</script>
<template>
  <div class="py-4">
    <Quize :questions="quizeStore.words" />
  </div>
</template>
<style></style>
