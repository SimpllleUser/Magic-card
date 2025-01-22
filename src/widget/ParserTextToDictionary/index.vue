<script setup lang="ts">
  import { defineEmits, ref } from 'vue';
  import InputSeparatedSymbol from './_components/InputSeparatedSymbol.vue';
  import { Icons } from '@/core/models/icons';
  import { Colors, Variants } from '@/core/models/enums';
  import { separateByString } from './helpers/separates';

  interface Emits {
    (event: 'set-words', payload: Array<Array<string>>): void;
  }

  const emit = defineEmits<Emits>();

  const words = ref([]);

  const sourceText = ref('');

  const separatorToRowSymbol = ref(',');

  const separatedToWordsOfRowsSymbol = ref('-');

  watch(
    () => [sourceText.value, separatorToRowSymbol.value, separatedToWordsOfRowsSymbol.value],
    () => {
      words.value = separateByString(sourceText.value, separatorToRowSymbol.value)
        .map((item) => separateByString(item, separatedToWordsOfRowsSymbol.value))
        .map((item) => (item.length <= 2 ? item : [item[0], item.slice(1).join(separatedToWordsOfRowsSymbol.value)]));
    }
  );

  const placeholderTextAreaInput = computed(() =>
    new Array(3)
      .fill(null)
      .map((_, index) => `Word-${index + 1}${separatedToWordsOfRowsSymbol.value}Definition-${index + 1}`)
      .join(separatorToRowSymbol.value)
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
        <VTextarea v-model="sourceText" :auto-grow="true" :placeholder="placeholderTextAreaInput" :rows="5" />
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
