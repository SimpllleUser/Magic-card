<script setup lang="ts">
  import { ref } from 'vue';
  import InputSplitter from './InputSplitter.vue';
  import InputSeparatedSymbol from './InputSeparatedSymbol.vue';
  import WordsList from './WordsList.vue';
  import { WordEntity } from '../types/word';
  import { generateId } from 'src/helpers/id-generator';
  import { TITLE_SEPARATDE_ON_WORD_ITEMS, TITLE_SEPARATED_ON_DEFINITIONS } from 'src/features/words/constants';

  import { useVModel } from '@vueuse/core';

  interface Props {
    modelValue: Array<WordEntity>;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['update:modelValue']);

  const wordsListModel = useVModel(props, 'modelValue', emit);

  const text = ref('');
  // const textSeparated = ref<Array<WordEntity>>([]);

  const setSeparatedValue = (value: Array<Array<string>>) => {
    wordsListModel.value = value.map((item) => ({
      id: generateId(),
      from: item[0],
      to: item[1]
    }));
  };

  const separatedOnWordItems = ref('');

  const separatedOnDefinitions = ref('');
</script>

<template>
  <div class="full-width">
    <div>
      <input-splitter
        v-model="text"
        @update-separated-value="setSeparatedValue"
        :separator-word-items="separatedOnWordItems"
        :separator-definition="separatedOnDefinitions"
      />
    </div>
    <div class="row justify-between q-pt-md">
      <div>
        <input-separated-symbol :title="TITLE_SEPARATDE_ON_WORD_ITEMS" v-model="separatedOnWordItems" />
      </div>
      <div>
        <input-separated-symbol :title="TITLE_SEPARATED_ON_DEFINITIONS" v-model="separatedOnDefinitions" />
      </div>
    </div>
    <div class="q-pt-md">
      <words-list :words="wordsListModel" />
    </div>
  </div>
</template>
