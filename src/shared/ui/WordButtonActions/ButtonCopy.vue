<script lang="ts" setup>
  import { Colors, Icons, Variants } from '@/core';
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
      openOnClick: copied.value
    };
  });
</script>

<template>
  <VBtn
    v-tooltip="tooltipConfig"
    :color="Colors.Primary"
    :icon="Icons.Copy"
    :variant="Variants.Plain"
    @click.stop="toCopy"
    @mouseleave="onLeave"
  />
</template>
