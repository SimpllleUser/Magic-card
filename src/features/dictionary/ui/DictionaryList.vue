<script setup lang="ts">
  import { defineEmits } from 'vue';
  import { Colors, Variants } from '@/core/models/enums';
  import { PageNames } from '@/router/types';
  import { BaseList } from '@/shared';
  import { Dictionary, DictionaryItem } from '@/features/dictionary';
  import { KnowledgeItem, WordProgress } from '@/features/knowledge';

  const props = defineProps<{
    dictionary: Dictionary;
    selectedWords: DictionaryItem[];
    learnedWords: WordProgress[];
    dueWords: WordProgress[];
    weakWords: WordProgress[];
  }>();

  const emit = defineEmits<{
    (event: 'change-selected-words', payload: DictionaryItem[]): void;
  }>();

  const mapItem = (item: DictionaryItem, index: number) => ({
    ...item,
    number: index + 1,
    knowledgeLevel: getKnowledgeLabelAndColorOfWordById(item.id)
  });

  const getKnowledgeLabelAndColorOfWordById = (id: string) => {
    if (props.learnedWords.find(({ wordId }) => wordId === id)) return { label: 'Learned', color: Colors.Success };
    else if (props.dueWords.find(({ wordId }) => wordId === id)) return { label: 'Due', color: Colors.Warning };
    else if (props.weakWords.find(({ wordId }) => wordId === id)) return { label: 'Weak', color: Colors.Error };
    return null;
  };

  const LIST_TITLES = [
    {
      title: '#',
      key: 'number'
    },
    {
      title: 'From',
      key: 'from'
    },
    {
      title: 'To',
      key: 'to'
    },
    {
      title: 'Knowledge level',
      key: 'knowledgeLevel',
      align: 'center'
    }
  ];

  const selectedWords = ref(props.selectedWords);

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
    <template #item.knowledgeLevel="{ value }">
      <div v-if="!value">-</div>
      <div v-else>
        <KnowledgeItem
          :color="value.color"
          :label="value.label"
        />
      </div>
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
