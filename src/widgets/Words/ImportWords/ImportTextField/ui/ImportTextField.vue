<script lang="ts" setup>
  import { ref } from 'vue';
  import { VModal } from 'src/shared/ui/VModal';
  import { InputSplitter } from 'src/shared/ui/Inputs';
  import { WordListForm } from 'src/shared/ui/Words/WordListForm';
  import { WordEntity } from 'src/features/words/types/word';
  import { generateId } from 'src/shared/lib/utils/id-generator';
  import { BUTTON_CONFIG, DEFAULT_SEPARATED_VALUES, MODAL } from './constants';
  import {
    InputSeparatedSymbol,
    TITLE_SEPARATDE_ON_WORD_ITEMS,
    TITLE_SEPARATED_ON_DEFINITIONS
  } from 'src/shared/ui/Inputs/InputSeparatedSymbol';
  interface Emits {
    (event: 'import', payload: Array<WordEntity>): void;
  }

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
  <VModal :title="MODAL.TITLE" :id="MODAL.ID">
    <template #default="{ hide }">
      <div class="q-pa-md">
        <div>
          <InputSplitter
            v-model="text"
            @update-separated-value="setSeparatedValue"
            :separator-word-items="separatedOnWordItems"
            :separator-definition="separatedOnDefinitions"
          />
        </div>
        <div class="row justify-between q-pt-md">
          <div>
            <InputSeparatedSymbol :title="TITLE_SEPARATDE_ON_WORD_ITEMS" v-model="separatedOnWordItems" />
          </div>
          <div>
            <InputSeparatedSymbol :title="TITLE_SEPARATED_ON_DEFINITIONS" v-model="separatedOnDefinitions" />
          </div>
        </div>
        <div>
          <WordListForm v-model="wordsListModel" :allow-add-word="false" />
        </div>
        <div class="actions row justify-center q-pt-md">
          <q-btn v-bind="BUTTON_CONFIG" @click="onImport(hide)" />
        </div>
      </div>
    </template>
  </VModal>
</template>

<style scoped lang="scss">
  @import './styles.scss';
</style>
