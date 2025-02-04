<script setup lang="ts">
  import { DictionaryItem } from '@/core/models/Topic';
  import { QuestionItem, useQuiz } from './useQuize';
  import { Colors, Variants } from '@/core/models/enums';
  import BaseList from '@/shared/ui/BaseList/BaseList.vue';
  import { omit } from 'lodash';
  import { Icons } from '@/core/models/icons';

  type ItemResult = Omit<QuestionItem & { number: number }, 'answerId'>;

  const props = withDefaults(defineProps<{ questions: QuestionItem[] }>(), {
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

  const correctQuestionsQuantity = computed(() => props.questions.filter((item) => item.isCorrect).length);
  const qualityOfQuizeColor = computed(() => {
    const { length } = props.questions;
    const correct = correctQuestionsQuantity.value;

    if (correct === length) return Colors.Accent; /// All correct
    if (correct >= length / 2) return Colors.Success; /// More then half correct
    if (correct < length / 2) return Colors.Warning; /// Less then half corect

    return Colors.Primary;
  });
</script>

<template>
  <div>
    <BaseList :data="props.questions" header-sticky height="20rem" hide-footer :keys="keys" :map-item="mapItem">
      <template #item.isCorrect="{ value }">
        <div class="ml-4">
          <VIcon v-bind="getIconConfig(value)" />
        </div>
      </template>
    </BaseList>
    <VDivider class="border-opacity-25 my-2" />
    <div class="total d-flex justify-center">
      <div>
        <span> Correct </span>
        <VChip class="ma-2" :color="qualityOfQuizeColor" label>
          <b>{{ correctQuestionsQuantity }}</b>
        </VChip>
        <span> From </span>
        <VChip class="ma-2" :color="Colors.Primary" label>
          <b>{{ questions.length }}</b>
        </VChip>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
