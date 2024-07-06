<script lang="ts" setup>
  import { ref } from 'vue';
  import VModal from 'src/shared/ui/VModal/VModal.vue';
  import InputSplitter from 'src/features/words/components/InputSplitter.vue';
  import InputSeparatedSymbol from 'src/features/words/components/InputSeparatedSymbol.vue';
  import { TITLE_SEPARATDE_ON_WORD_ITEMS, TITLE_SEPARATED_ON_DEFINITIONS } from 'src/features/words/constants';
  import { WordEntity } from 'src/features/words/types/word';
  import { generateId } from 'src/helpers/id-generator';
  import WordsList from 'src/features/words/components/WordsList.vue';
  interface Emits {
    (event: 'import', payload: Array<WordEntity>): void;
  }

  const MODAL_ID = 'import-text-field-modal';
  const MODAL_TITLE = 'Import words by text field';

  const DEFAULT_SEPARATED_VALUES = {
    wordItem: ',',
    definition: ' - '
  };

  const wordsListModel = ref<Array<WordEntity>>([]);
  const text = ref('');
  const emit = defineEmits<Emits>();
  const setSeparatedValue = (value: Array<Array<string>>) => {
    wordsListModel.value = value.map((item) => ({
      id: generateId(),
      from: item[0],
      to: item[1]
    }));
  };

  const separatedOnWordItems = ref(DEFAULT_SEPARATED_VALUES.wordItem);

  const separatedOnDefinitions = ref(DEFAULT_SEPARATED_VALUES.definition);

  const resetForm = () => {
    separatedOnWordItems.value = DEFAULT_SEPARATED_VALUES.wordItem;
    separatedOnDefinitions.value = DEFAULT_SEPARATED_VALUES.definition;
    text.value = '';
    wordsListModel.value = [];
  };
  const onImport = (action?: CallableFunction | undefined) => {
    emit('import', wordsListModel.value);
    action && action();
    resetForm();
  };
</script>

<template>
  <VModal :title="MODAL_TITLE" :id="MODAL_ID">
    <template #default="{ hide }">
      <div class="q-pa-md">
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
        <div>
          <WordsList v-model="wordsListModel" :allow-add-word="false" />
        </div>
        <div class="actions row justify-center q-pt-md">
          <q-btn class="text-black" color="secondary" label="Import" @click="onImport(hide)" />
        </div>
      </div>
    </template>
  </VModal>
</template>
