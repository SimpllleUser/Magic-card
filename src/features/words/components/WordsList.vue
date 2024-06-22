<script setup lang="ts">
  import { ref, defineProps, watch } from 'vue';
  import { WordEntity } from '../types/word';

  interface Props {
    words: Array<WordEntity>;
  }

  interface Emit {
    (event: 'update-list', word: WordEntity): void;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<Emit>();

  const rows = ref(props.words);

  const onRemoveWord = (wordId: string) => {
    rows.value = rows.value.filter(({ id }) => id !== wordId);
  };

  const getEditableWordItem = (word: WordEntity, index: number) => ({
    ...word,
    index
  });

  watch(
    () => props.words,
    () => {
      rows.value = props.words.map(getEditableWordItem);
    },
    {
      immediate: true
    }
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
</script>

<template>
  <div>
    <q-table :rows="rows" v-bind="TABLE_CONFIG">
      <template v-slot:body-cell-from="props">
        <q-td :props="props">
          <q-input v-model="rows[props.row.index].from" />
        </q-td>
      </template>
      <template v-slot:body-cell-to="props">
        <q-td :props="props">
          <q-input v-model="rows[props.row.index].to" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="actions row justify-end">
            <q-btn
              v-bind="{
                icon: 'delete',
                color: 'primary',
                outline: true,
                size: 'sm',
                rounded: true
              }"
              @click="onRemoveWord(props.row.id)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
