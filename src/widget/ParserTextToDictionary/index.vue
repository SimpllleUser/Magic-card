<script setup lang="ts">
  import { defineEmits, ref } from 'vue';
  import InputSeparatedSymbol from './_components/InputSeparatedSymbol.vue';
  import { Icons } from '@/core/models/icons';
  import { Colors, Variants } from '@/core/models/enums';
  import { separateByString } from './helpers/separates';

  interface Emits {
    (event: 'set-words', payload: Array<Array<string>>);
  }

  const emit = defineEmits<Emits>();

  const words = ref([]);

  const text = ref('');

  const separatorToRowSymbol = ref(',');

  const separatedToWordsOfRowsSymbol = ref('-');

  watch(
    () => [text.value, separatorToRowSymbol.value, separatedToWordsOfRowsSymbol.value],
    () => {
      words.value = separateByString(text.value, separatorToRowSymbol.value)
        .map((item) => separateByString(item, separatedToWordsOfRowsSymbol.value))
        .map((item) => (item.length <= 2 ? item : [item[0], item.slice(1).join(separatedToWordsOfRowsSymbol.value)]));
    }
  );
</script>

<template>
  <div class="full-width">
    <VRow>
      <VCol>
        <InputSeparatedSymbol v-model="separatorToRowSymbol" label="Separated to rows" />
      </VCol>
      <VCol>
        <InputSeparatedSymbol v-model="separatedToWordsOfRowsSymbol" label="Separated to words of row" />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VTextarea v-model="text" label="Text" />
      </VCol>
    </VRow>
    <div class="d-flex items-center justify-center">
      <VBtn
        :append-icon="Icons.ArrowDown"
        :color="Colors.Primary"
        :variant="Variants.Outlined"
        @click="emit('set-words', words)"
      >
        Add all words
      </VBtn>
    </div>
  </div>
</template>
