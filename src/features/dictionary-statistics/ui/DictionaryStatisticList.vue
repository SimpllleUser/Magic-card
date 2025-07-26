<script setup lang="ts">
  import { BaseList } from '@/shared/ui/BaseList';
  import { DICTIONARY_STATISTIC_LABELS } from '../model/constants';
  import { IDictionaryStatistics } from '../model/types';
  import { getClassByES, getStatusLearning } from '../model/utils';

  defineOptions({
    name: 'DictionaryStatisticList'
  });

  interface Props {
    statistics: IDictionaryStatistics[];
  }

  const props = defineProps<Props>();

  const statisticKeys = Object.keys(DICTIONARY_STATISTIC_LABELS).map((key) => ({
    key,
    title: DICTIONARY_STATISTIC_LABELS[key]
  }));

  const listKeys = computed(() => statisticKeys);

  const listData = computed(() => {
    const listData = props.statistics;
    listData.forEach((item) => {
      statisticKeys.forEach(({ key }) => {
        item[key] = item[key].toString().includes('.') ? Number(item[key]).toFixed(1) : item[key];
      });
    });
    return listData;
  });
</script>

<template>
  <BaseList
    :data="listData"
    hide-footer
    :keys="listKeys"
  >
    <template #item.WM="{ value }">
      <span
        class="text-no-wrap"
        :class="`border-opacity-100 border-b-lg ${getClassByES(value)}`"
      >
        {{ value }}
      </span>
    </template>
    <template #item.ES="{ value }">
      <span
        class="text-no-wrap"
        :class="`border-opacity-100 border-b-lg ${getClassByES(value)}`"
      >
        {{ getStatusLearning(value) }}
      </span>
    </template>
  </BaseList>
</template>
