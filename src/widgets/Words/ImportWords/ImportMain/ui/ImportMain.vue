<script setup lang="ts">
  import { useModal } from 'src/shared/lib/use/useModal';

  import { WordEntity } from 'src/features/words/types/word';
  import { ImportTextField } from 'src/widgets/Words/ImportWords/ImportTextField';
  import { BUTTON_BASE_CONFIG } from './constants';

  interface Emits {
    (event: 'import', payload: Array<WordEntity>): void;
  }

  const emit = defineEmits<Emits>();

  const IMPORT_BUTTONS = [
    {
      ...BUTTON_BASE_CONFIG,
      click: () => {
        useModal('import-text-field-modal').show();
      }
    }
  ];

  const onImport = (words: Array<WordEntity>) => emit('import', words);
</script>

<template>
  <ImportTextField @import="onImport" />
  <div class="row justify-between">
    <div>
      <q-btn v-for="(button, index) in IMPORT_BUTTONS" :key="index" v-bind="button" @click="button.click" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
