<script setup lang="ts">
  import { useModal } from 'src/shared/composables/useModal';

  import ImportTextField from 'src/features/words/components/Imports/ImportTextField.vue';
  import { WordEntity } from 'src/features/words/types/word';

  interface Emits {
    (event: 'import', payload: Array<WordEntity>): void;
  }

  const emit = defineEmits<Emits>();

  const IMPORT_BUTTONS = [
    {
      label: 'Text field',
      modalId: 'import-text-field-modal',
      color: 'primary',
      outline: true,
      size: 'sm',
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
