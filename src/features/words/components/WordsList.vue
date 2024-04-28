<script setup lang="ts">
  import { ref, defineProps, computed } from 'vue';
  import { WordEntity } from '../types/word';

  import { useCRUD } from 'src/shared/composables/useCRUD';
  import { findIndex } from 'lodash';

  interface Props {
    words: Array<WordEntity>;
  }

  interface Emit {
    (event: 'update-list', word: WordEntity): void;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<Emit>();

  const initWordsCRUD = () => useCRUD<WordEntity>(props.words, { returnAsObject: true });
  const removeWord = (word: WordEntity) => {
    const listCrud = initWordsCRUD();
    listCrud.remove(word.id);
  };

  const editableWorld = ref<WordEntity | null>(null);
  const editWord = (word: WordEntity) => {
    editableWorld.value = word;
  };

  const disabledEdit = () => {
    editableWorld.value = null;
  };

  const activeEditModeAction = [
    {
      icon: 'check',
      rounded: true,
      size: 'sm',
      click: (word) => {
        const listCrud = initWordsCRUD();
        listCrud.update(word);
        emit('update-list', listCrud.data.value);
        disabledEdit();
      },
      color: 'positive'
    },
    {
      icon: 'cancel',
      rounded: true,
      size: 'sm',
      click: (word) => {
        const listCrud = initWordsCRUD();
        const wordIndex = findIndex(props.words, { id: word.id });
        listCrud.update(props.words[wordIndex]);
        disabledEdit();
      },
      color: 'negative',
      class: 'q-ml-sm'
    }
  ];

  const callableAction = (word: WordEntity, action?: CallableFunction) => () => {
    action && action(word);
  };

  const rows = computed(() =>
    props.words
      .map((word: WordEntity, index: number) => ({ ...word, index, number: index + 1 }))
      .map((word: WordEntity) => ({
        ...word,
        actions: [
          {
            click: callableAction(word, editWord),
            icon: 'edit',
            color: 'primary',
            unelevated: true,
            size: 'sm',
            rounded: true
          },
          {
            click: callableAction(word, removeWord),
            icon: 'delete',
            color: 'primary',
            outline: true,
            size: 'sm',
            rounded: true
          }
        ]
      }))
  );

  const COLUMNS = [
    { name: 'number', label: '#', align: 'left', field: 'number' },
    { name: 'from', label: 'From', align: 'left', field: 'from' },
    { name: 'to', label: 'To', align: 'left', field: 'to' },
    { name: 'actions', label: 'Actions', align: 'right', field: 'action' }
  ];

  const TABLE_CONFIG = {
    // title: 'Words list',
    columns: COLUMNS,
    rowKey: 'name',
    separator: 'horizontal',
    flat: true,
    bordered: true,
    noDataLabel: 'Empty list of words',
    noResultsLabel: 'Not find of words'
  };

  const isEditableWord = (word: WordEntity) => editableWorld.value?.id === word?.id;
</script>

<template>
  <div>
    <q-table :rows="rows" v-bind="TABLE_CONFIG">
      <template v-slot:body-cell-from="props">
        <q-td :props="props">
          <div v-if="!isEditableWord(props.row)">{{ props.row.from }}</div>
          <q-input v-else v-model="editableWorld.from" />
        </q-td>
      </template>
      <template v-slot:body-cell-to="props">
        <q-td :props="props">
          <div v-if="!isEditableWord(props.row)">{{ props.row.to }}</div>
          <q-input v-else v-model="editableWorld.to" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="actions row justify-end">
            <div v-if="isEditableWord(props.row)">
              <q-btn
                v-for="(actionEdit, index) in activeEditModeAction"
                :key="index"
                v-bind="actionEdit"
                @click="actionEdit.click(editableWorld)"
              />
            </div>
            <div
              v-else
              class="actions__item q-ml-sm row items-center"
              v-for="action in props.row.actions"
              :key="action.icon"
            >
              <q-btn v-bind="action" @click="action.click" />
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
