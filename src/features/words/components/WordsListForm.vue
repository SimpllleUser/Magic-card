<script setup lang="ts">
  import { defineProps, watch, computed } from 'vue';
  import { WordEntity } from '../types/word';
  import { generateId } from 'src/helpers/id-generator';

  interface Props {
    modelValue: Array<WordEntity>;
    allowAddWord?: boolean;
  }

  interface Emit {
    (event: 'update-list', word: WordEntity): void;
    (event: 'update:modelValue', payload: Array<WordEntity>): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    allowAddWord: true
  });

  const emit = defineEmits<Emit>();

  const getEditableWordItem = (word: WordEntity, index: number) => ({
    ...word,
    index,
    number: index + 1
  });

  const updateModelValue = (value: Array<WordEntity>) => emit('update:modelValue', value);

  const modelValue = computed({
    get: () => props.modelValue?.map(getEditableWordItem) || [],
    set: updateModelValue
  });

  const onRemoveWord = (wordId: string) => {
    modelValue.value = modelValue.value.filter(({ id }) => id !== wordId);
  };

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

  const setInput = (value: string, { key, index }: { key: string; index: number }) => {
    const list: Array<WordEntity> = [...modelValue.value];
    list[index][key] = value;
    updateModelValue(list);
  };

  const addWord = () => {
    updateModelValue([{ id: generateId(), from: '', to: '' }, ...props.modelValue]);
  };
</script>

<template>
  <div>
    <div class="word-list__actions q-py-sm row justify-end">
      <q-btn color="primary" label="Add" @click="addWord" />
    </div>
    <q-table :rows="modelValue" v-bind="TABLE_CONFIG">
      <template v-slot:body-cell-from="props">
        <q-td :props="props">
          <q-input
            :model-value="modelValue[props.row.index].from"
            @update:model-value="setInput($event, { key: 'from', index: props.row.index })"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-to="props">
        <q-td :props="props">
          <q-input
            :model-value="modelValue[props.row.index].to"
            @update:model-value="setInput($event, { key: 'to', index: props.row.index })"
          />
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
