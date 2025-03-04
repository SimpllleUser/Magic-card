<script lang="ts" setup>
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useClipboard } from '@vueuse/core';
  import { ref } from 'vue';

  const props = withDefaults(defineProps<{ value: string }>(), {
    value: ''
  });

  const source = computed(() => props.value);
  const { copy } = useClipboard({ source });

  const copied = ref(false);
  const toCopy = () => {
    if (!props.value) return;
    copy();
    copied.value = true;
  };


  const onLeave = () => {
    setTimeout(() => {
      copied.value = false;
    }, 300);
  };

  const tooltipConfig = computed(() => {
    return {
      text: copied.value ? 'Copied!' : 'Copy',
      openOnHover: !copied.value,
      openOnClick: copied.value,
    };
  });
</script>

<template>
  <VBtn
    :icon="Icons.Copy"
    @click.stop="toCopy"
    @mouseleave="onLeave"
    :color="Colors.Primary"
    :variant="Variants.Plain"
    v-tooltip="tooltipConfig"
  />
</template>
