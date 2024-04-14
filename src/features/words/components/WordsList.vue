<script setup lang="ts">
  import { ref, defineProps } from 'vue';
  import WordsItem from './WordsItem.vue';

  type Words = [string, string];

  interface Props {
    words: Array<Words>;
  }

  const props = defineProps<Props>();
</script>

<template>
  <div>
    <q-list bordered separator>
      <q-item class="bg-primary">
        <q-item-section> <b>From</b> </q-item-section>
        <q-item-section class="text-center"> <b>-</b> </q-item-section>
        <q-item-section class="text-right"> <b>To</b> </q-item-section>
      </q-item>
      <words-item v-for="(word, key) in props.words" :key="key" :word="word" />
    </q-list>
  </div>
</template>
