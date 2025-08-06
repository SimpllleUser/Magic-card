<script setup lang="ts">
  import { BaseModal } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import { Colors, Sizes, Variants } from '@/core/models/enums';
  import { IDictionaryStatistics } from '../model/types';
  import DictionaryStatistics from './DictionaryStatisticGraphic.vue';
  import DictionaryStatisticList from './DictionaryStatisticList.vue';
  import { useBreakPointsApp } from '@/shared/use/useBreakPointsApp';

  interface Props {
    title: string;
    statistics: IDictionaryStatistics[];
  }

  const props = defineProps<Props>();

  const modalTitle = computed(() => `Dictionary statistic of "${props.title}"`);

  const openPanel = ref([]);

  const toggleGraphic = () => {
    if (openPanel.value.length > 0) {
      openPanel.value = [];
    } else {
      openPanel.value = [0];
    }
  };

  const togglePanelButtonLabel = computed(() => (openPanel.value.length > 0 ? 'Hide graphic' : 'Show graphic'));

  const { isMobile } = useBreakPointsApp();
</script>

<template>
  <BaseModal
    :id="Modals.DictionaryStatistic"
    :fullscreen="isMobile"
    :max-height="isMobile && '80vh'"
    :min-width="!isMobile && `75%`"
    :title="modalTitle"
  >
    <div>
      <div
        v-if="statistics.length"
        class="d-flex justify-center pb-4"
      >
        <VBtn
          :color="Colors.Secondary"
          :size="Sizes.Small"
          :variant="Variants.Flat"
          @click="toggleGraphic"
        >
          {{ togglePanelButtonLabel }}
        </VBtn>
      </div>
      <VExpansionPanels
        v-model="openPanel"
        class="mb-8"
      >
        <VExpansionPanel>
          <VExpansionPanelText>
            <div class="d-flex justify-center block">
              <DictionaryStatistics :statistics="statistics" />
            </div>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </div>

    <VCard>
      <DictionaryStatisticList :statistics="statistics" />
    </VCard>
  </BaseModal>
</template>
