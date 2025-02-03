<script setup lang="ts">
  import { DictionaryItem } from '@/core/models/Topic';
  import { QuestionItem, useQuiz } from './useQuize';
  import { Colors, Variants } from '@/core/models/enums';
  import BaseList from '@/shared/ui/BaseList/BaseList.vue';
  import { omit } from 'lodash';
  import { Icons } from '@/core/models/icons';

  type ItemResult = Omit<QuestionItem & { number: number }, 'answerId'>;

  const props = withDefaults(defineProps<{ questions: DictionaryItem[] }>(), {
    questions: []
  });

  const mapItem = (item: QuestionItem, index: number): ItemResult => {
    const mappedItem = omit(item, 'answerId');
    return { ...mappedItem, number: index + 1, answer: mappedItem.answer || '-' };
  };
  const keys = [
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
      title: 'Correct',
      key: 'isCorrect'
    },
    {
      title: 'Answer',
      key: 'answer'
    }
  ].map((item) => ({
    ...item,
    sortable: false
  }));

  const getIconConfig = (value: boolean) => {
    return value
      ? {
          icon: Icons.Check,
          color: Colors.Success
        }
      : {
          icon: Icons.Close,
          color: Colors.Error
        };
  };
</script>

<template>
  <div>
    <BaseList :data="props.questions" hide-footer :keys="keys" :map-item="mapItem">
      <template #item.isCorrect="{ value }">
        <div class="ml-4">
          <VIcon v-bind="getIconConfig(value)" />
        </div>
      </template>
    </BaseList>
  </div>
</template>

<style lang="scss" scoped></style>
