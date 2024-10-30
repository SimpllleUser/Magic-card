<script setup lang="ts">
  import { defineEmits, defineProps, ref } from 'vue';
  // import { useVModel } from '@vueuse/core';
  import InputSplitter from './_components/InputSplitter.vue';
  import InputSeparatedSymbol from './_components/InputSeparatedSymbol.vue';

  interface Props {
    modelValue: Array<{ from: string; to: string; id?: string }>;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['update:modelValue']);

  const words = ref([]);

  // const wordsListModel = useVModel(props, 'modelValue', emit);

  const text = ref('');
  // const textSeparated = ref<Array<WordEntity>>([]);

  const setSeparatedValue = (value: Array<Array<string>>) => {
    words.value = value;
  };

  const separatorToRowSymbol = ref('-');

  const separatedToWordsOfRowsSymbol = ref(',');
</script>

<template>
  <div class="full-width">
    <div>
      <InputSplitter
        v-model="text"
        :separator-definition="separatedToWordsOfRowsSymbol"
        :separator-word-items="separatorToRowSymbol"
        @update-separated-value="setSeparatedValue"
      />
    </div>
    <VRow>
      <VCol>
        <InputSeparatedSymbol v-model="separatorToRowSymbol" title="Separated to rows" />
      </VCol>
      <VCol>
        <InputSeparatedSymbol v-model="separatedToWordsOfRowsSymbol" title="Separated to words of row" />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VTextarea v-model="text" label="Text" />
      </VCol>
    </VRow>
  </div>
</template>
