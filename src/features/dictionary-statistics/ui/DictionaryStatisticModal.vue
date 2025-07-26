<script setup lang="ts">
  import { BaseModal } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import { DICTIONARY_STATISTIC_LABELS } from '../model/constants';
  import { BaseList } from '@/shared/ui/BaseList';
  import { Bar } from 'vue-chartjs';
  import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
  import { Colors, Sizes, Variants } from '@/core/models/enums';
  import { DictionaryStatistics } from '../model/types';
  import { getStatusLearning } from '../model/utils';
  /// TODO separate list and graphic on components нижче схема
  /*  src/
├── entities/
│   └── [your-entity]/           # Назва вашої сутності
│       ├── model/
│       ├── api/
│       └── ui/
│           ├── EntityCard/
│           ├── EntityStatistics/  # 📊 Компонент статистики
│           └── index.ts
├── features/
│   └── entity-statistics/       # 🎯 Фіча показу статистики
│       ├── model/
│       │   └── statisticsStore.ts
│       ├── ui/
│       │   ├── StatisticsModal/
│       │   ├── StatisticsChart/
│       │   └── StatisticsList/
│       └── index.ts
└── pages/
    └── EntityDetailPage/        # 📄 Сторінка деталей
        └── ui/
            └── EntityDetailPage.vue */

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  const dataSetColors = ['#0bb4ff', '#50e991', '#e6d800', '#9b19f5', '#ff4d4d', '#00d4b4', '#ff66cc', '#33cc33'];
  const chartData = computed(() => {
    const labels = props.statistics.map((item) => new Date(item.ts).toLocaleString());

    const datasets = Object.keys(DICTIONARY_STATISTIC_LABELS).map((key, index) => {
      return {
        label: DICTIONARY_STATISTIC_LABELS[key],
        data: props.statistics.map((item) => item[key]),
        backgroundColor: dataSetColors[index],
        borderWidth: 1
      };
    });
    return {
      labels,
      datasets
    };
  });

  const getClassByES = (value: number): string => {
    if (value < 50) {
      return 'border-error';
    } else if (value < 80) {
      return 'border-warning';
    } else {
      return 'border-success';
    }
  };

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

  const openPanel = ref([]);

  const toggleGraphic = () => {
    if (openPanel.value.length > 0) {
      openPanel.value = [];
    } else {
      openPanel.value = [0];
    }
  };

  const togglePanelButtonLabel = computed(() => (openPanel.value.length > 0 ? 'Hide graphic' : 'Show graphic'));
</script>

<template>
  <BaseModal
    :id="Modals.DictionaryStatistic"
    max-height="60vh"
    min-width="75%"
    :title="modalTitle"
  >
    <div>
      <div class="d-flex justify-center">
        <VBtn
          :color="Colors.Secondary"
          :size="Sizes.Small"
          :variant="Variants.Flat"
          @click="toggleGraphic"
        >
          {{ togglePanelButtonLabel }}
        </VBtn>
      </div>
      <VExpansionPanels v-model="openPanel">
        <VExpansionPanel>
          <VExpansionPanelText>
            <div class="d-flex justify-center block">
              <Bar :data="chartData" />
            </div>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </div>
    <div>
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
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped></style>
