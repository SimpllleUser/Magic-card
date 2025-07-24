<script setup lang="ts">
  import { BaseModal } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import { DictionaryStatistics } from '@/features/dictionary/model/types';
  import { Bar } from 'vue-chartjs';
  import { DICTIONARY_STATISTIC_LABELS } from '@/features/dictionary/model/constants';
  import { omit } from 'lodash';
  import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  /// TODO convert into list
  const dataSetColors = ['#0bb4ff', '#50e991', '#e6d800', '#9b19f5', '#ffa300'];

  interface Props {
    statistics: DictionaryStatistics[];
  }

  const props = defineProps<Props>();

  const data = computed(() => {
    const labels = props.statistics.map((item) => item.ts);
    const datasets = Object.keys(omit(DICTIONARY_STATISTIC_LABELS, ['ATQ'])).map((key, index) => ({
      label: labels[index],
      backgroundColor: dataSetColors[index],
      data: props.statistics.map((item) => item[key])
    }));
    return {
      datasets
    };
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
</script>

<template>
  <BaseModal
    :id="Modals.DictionaryStatistic"
    title="Dictionary statistic"
  >
    <div>Statistics</div>
    <div>
      <Bar
        :data="data"
        :options="options"
      />
    </div>
  </BaseModal>
</template>
