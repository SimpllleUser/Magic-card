<script setup lang="ts">
  import { defineEmits, defineProps, ref } from 'vue';
  import { useVModel } from '@vueuse/core';
  import InputSplitter from './_components/InputSplitter.vue';
  import InputSeparatedSymbol from './_components/InputSeparatedSymbol.vue';
  import { Icons } from '@/core/models/icons';
  import { Colors, Variants } from '@/core/models/enums';

  // interface Props {
  //   modelValue: Array<{ from: string; to: string; id?: string }>;
  // }

  // const props = defineProps<Props>();

  interface Emits {
    (event: 'set-words', payload: Array<Array<string>>);
  }

  const emit = defineEmits<Emits>();

  // const wordsListModel = useVModel(props, 'modelValue', emit);
  const words = ref([]);

  const text = ref('');

  const setSeparatedValue = (value: Array<Array<string>>) => {
    words.value = value;
  };

  const separatorToRowSymbol = ref(',');

  const separatedToWordsOfRowsSymbol = ref('-');

  // TODO add logic like composable from component InputSplitter
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
