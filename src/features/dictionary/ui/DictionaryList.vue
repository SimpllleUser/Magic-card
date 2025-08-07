<script setup lang="ts">
  import { defineEmits } from 'vue';
  import { Colors, Variants } from '@/core/models/enums';
  import { PageNames } from '@/router/types';
  import BaseList from '../../../shared/ui/BaseList/BaseList.vue';
  import { Dictionary, DictionaryItem } from '@/features/dictionary/model/types';

  const props = defineProps<{
    dictionary: Dictionary;
    selectedWords: DictionaryItem[];
  }>();

  const emit = defineEmits<{
    (event: 'change-selected-words', payload: DictionaryItem[]): void;
  }>();

  const mapItem = (item: DictionaryItem, index: number) => ({
    ...item,
    number: index + 1
  });

  const LIST_TITLES = [
    {
      title: '#',
      key: 'number',
      sortable: false
    },
    {
      title: 'From',
      key: 'from',
      sortable: false
    },
    {
      title: 'To',
      key: 'to',
      sortable: false
    }
  ];

  const selectedWords = ref([...props.dictionary?.items]);

  watch(
    () => selectedWords.value,
    (value) => {
      emit('change-selected-words', value);
    }
  );
</script>

<template>
  <BaseList
    v-model:selected-items="selectedWords"
    :data="dictionary?.items"
    header-title="Dictionary"
    hide-footer
    :keys="LIST_TITLES"
    :map-item="mapItem"
    selectable
  >
    <template #header-actions>
      <slot name="header-actions" />
    </template>
    <template #empty-text>
      <div>
        <p>
          Let’s add some words
          <VBtn
            class="px-1"
            :color="Colors.Primary"
            :to="{ name: PageNames.DictionaryUpdate, params: { id: dictionary.id } }"
            :variant="Variants.Contained"
          >
            go to edit module
          </VBtn>
        </p>
      </div>
    </template>
  </BaseList>
</template>

<style scoped lang="scss">
  :deep(.v-table) {
    height: 85vh;
    header.v-toolbar {
      position: sticky;
      z-index: 9;
      left: 0;
      top: 0;
      transition: none !important;
    }
  }
</style>
