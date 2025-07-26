<script setup lang="ts">
  import { Bar } from 'vue-chartjs';
  import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
  import { DATA_SET_COLORS, DICTIONARY_STATISTIC_LABELS } from '@/features/dictionary-statistics/model/constants';
  import { IDictionaryStatistics } from '@/features/dictionary-statistics/model/types';

  defineOptions({
    name: 'DictionaryStatisticGraphic'
  });

  interface Props {
    statistics: IDictionaryStatistics[];
  }

  const props = defineProps<Props>();

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  const chartData = computed(() => {
    const labels = props.statistics.map((item) => new Date(item.ts).toLocaleString());

    const datasets = Object.keys(DICTIONARY_STATISTIC_LABELS).map((key, index) => {
      return {
        label: DICTIONARY_STATISTIC_LABELS[key],
        data: props.statistics.map((item) => item[key]),
        backgroundColor: DATA_SET_COLORS[index],
        borderWidth: 1
      };
    });
    return {
      labels,
      datasets
    };
  });
</script>

<template>
  <Bar :data="chartData" />
</template>

<style scoped lang="scss"></style>
