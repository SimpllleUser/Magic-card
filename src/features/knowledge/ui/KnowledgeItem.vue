<script lang="ts" setup>
  import { Colors } from '@/core/models/enums';
  defineOptions({
    name: 'KnowledgeItem'
  });

  interface Props {
    label: string;
    value?: number | undefined;
    color: Colors;
  }

  const props = defineProps<Props>();

  const existValue = computed(() => typeof props.value !== 'undefined');
</script>
<template>
  <div v-if="!existValue">
    <VChip
      :color="color"
      label
    >
      {{ label }}
    </VChip>
  </div>
  <div
    v-else
    class="d-flex align-center"
  >
    <div class="pr-2">{{ label }}:</div>
    <div>
      <VChip
        :color="color"
        label
      >
        {{ value }}
      </VChip>
    </div>
  </div>
</template>
