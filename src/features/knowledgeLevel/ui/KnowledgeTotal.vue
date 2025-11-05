<script lang="ts" setup>
  import { useKnowledgeLevelStore } from '@/stores/statistics';
  import { getKnowledgeIcon, getMemoryColor, getMemoryLabel } from '@/features/knowledgeLevel/model/utils';

  defineOptions({
    name: 'KnowledgeTotal'
  });

  interface Props {
    dictionaryId: string;
    userId: string;
  }

  const props = defineProps<Props>();

  const knowledgeLevelStore = useKnowledgeLevelStore();

  watch(
    () => props.dictionaryId,
    () => {
      knowledgeLevelStore.init(props.dictionaryId, props.userId);
    },
    { immediate: true }
  );

  const memory = computed(() => ({
    label: getMemoryLabel(knowledgeLevelStore.totalScore),
    color: getMemoryColor(knowledgeLevelStore.totalScore),
    icon: getKnowledgeIcon(0.7)
  }));
</script>

<template>
  <div
    class="d-flex align-center"
    style="height: 100%"
  >
    <div class="pr-2">Level of knowledge</div>
    <div>
      <VChip
        :color="memory.color"
        label
      >
        <span class="pr-2">
          {{ memory.label }}
        </span>
        <VIcon :icon="memory.icon" />
      </VChip>
    </div>
  </div>
  <div>
    {{ knowledgeLevelStore.totalScore }}
  </div>
</template>
