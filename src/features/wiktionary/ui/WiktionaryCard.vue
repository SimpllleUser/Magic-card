<script setup lang="ts">
  defineOptions({ name: 'WiktionaryCard' });
  interface Props {
    word: string;
  }
  defineProps<Props>();
</script>
<template>
  <div>WiktionaryCard</div>
</template>

<style scoped></style>
