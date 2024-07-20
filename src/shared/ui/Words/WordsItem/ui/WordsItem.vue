<script setup lang="ts">
  import { defineProps } from 'vue';

  interface Props {
    word: [string, string];
  }

  const props = defineProps<Props>();
</script>

<template>
  <q-item clickable v-ripple class="justify-between">
    <q-item-section> {{ word[0] }} </q-item-section>
    <q-item-section class="text-center"> - </q-item-section>
    <q-item-section class="text-right"> {{ word[1] }} </q-item-section>
  </q-item>
</template>
