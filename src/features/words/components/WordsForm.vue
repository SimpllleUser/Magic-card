<script setup lang="ts">
  import { ref } from 'vue';
  import { TITLE_SEPARATDE_ON_WORD_ITEMS, TITLE_SEPARATED_ON_DEFINITIONS } from '../constants';
  import InputSplitter from './InputSplitter.vue';
  import InputSeparatedSymbol from './InputSeparatedSymbol.vue';
  import WordsList from './WordsList.vue';

  const text = ref('');
  const textSeparated = ref<Array<Array<string>>>([]);

  const setSeparatedValue = (value: Array<Array<string>>) => {
    textSeparated.value = value;
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
    <div class="row justify-between">
      <div>
        <input-separated-symbol :title="TITLE_SEPARATDE_ON_WORD_ITEMS" v-model="separatedOnWordItems" />
      </div>
      <div>
        {{ separatedOnDefinitions }}
        <input-separated-symbol :title="TITLE_SEPARATED_ON_DEFINITIONS" v-model="separatedOnDefinitions" />
      </div>
    </div>
    <!-- <div class="row justify-center">Result of list words with definition</div> -->
    <div>
      <words-list :words="textSeparated" />
    </div>
  </div>
</template>
