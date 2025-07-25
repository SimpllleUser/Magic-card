<script setup lang="ts">
  import { BaseModal } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import { DictionaryStatistics } from '@/features/dictionary/model/types';
  import { DICTIONARY_STATISTIC_LABELS } from '@/features/dictionary/model/constants';
  import { BaseList } from '@/shared/ui/BaseList';
  import { getStatusLearning } from '@/features/dictionary/model/utils';

  /// TODO convert into list

  const getClassByES = (value: number): string => {
    if (value < 50) {
      return 'border-error';
    } else if (value < 80) {
      return 'border-warning';
    } else {
      return 'border-success';
    }
  };
  // const dataSetColors = ['#0bb4ff', '#50e991', '#e6d800', '#9b19f5', '#ffa300'];

  interface Props {
    title: string;
    statistics: DictionaryStatistics[];
  }

  const props = defineProps<Props>();

  const statisticKeys = Object.keys(DICTIONARY_STATISTIC_LABELS).map((key) => ({
    key,
    title: DICTIONARY_STATISTIC_LABELS[key]
  }));
  const listKeys = computed(() => statisticKeys);

  const modalTitle = computed(() => `Dictionary statistic of ${props.title}`);
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
  <BaseModal
    :id="Modals.DictionaryStatistic"
    max-height="60vh"
    min-width="75%"
    :title="modalTitle"
  >
    <div>
      <BaseList
        :data="listData"
        hide-footer
        :keys="listKeys"
      >
        <template #item.ES="{ value }">
          <span
            class="text-no-wrap"
            :class="`border-opacity-100 border-b-lg ${getClassByES(value)}`"
          >
            {{ getStatusLearning(value) }}
          </span>
        </template>
      </BaseList>
    </div>
  </BaseModal>
</template>
