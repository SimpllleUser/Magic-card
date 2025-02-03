<script setup lang="ts">
  import Quize from '@/features/Play/Quize/Quize.vue';
  import { useQuizsStore } from '@/features/Play/store/quiz';

  const quizeStore = useQuizsStore();
</script>
<template>
  <Quize :questions="quizeStore.words" />
</template>
<style></style>
