<script lang="ts" setup>
  import { useKnowledgeLevelStore } from '@/stores/knowledge';
  import { getKnowledgeIcon, getMemoryColor, getMemoryLabel } from '@/features/knowledge/model';
  import { Colors } from '@/core/models/enums';
  import KnowledgeItem from './KnowledgeItem.vue';
  import { KnowledgeType } from '../model/types';

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
    icon: getKnowledgeIcon(knowledgeLevelStore.totalScore)
  }));

  const knowledgeItems = computed(() => [
    {
      label: 'Words learned',
      value: knowledgeLevelStore.learnedWords.length,
      color: Colors.Primary,
      type: KnowledgeType.Learned
    },
    {
      label: 'Words due',
      value: knowledgeLevelStore.dueWords.length,
      color: Colors.Warning,
      type: KnowledgeType.Due
    },
    {
      label: 'Words weak',
      value: knowledgeLevelStore.weakWords.length,
      color: Colors.Error,
      type: KnowledgeType.Weak
    }
  ]);
</script>

<template>
  <div class="d-flex align-center justify-space-between pa-4">
    <div class="d-flex align-center">
      <div class="pr-2">Total level of knowledge</div>
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
    <KnowledgeItem
      v-for="item in knowledgeItems"
      :key="item.label"
      :color="item.color"
      :label="item.label"
      :value="item.value"
    />
  </div>
</template>
