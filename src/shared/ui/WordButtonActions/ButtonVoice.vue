<script lang="ts" setup>
  import { Colors, Icons, Variants } from '@/core';
  import { useSpeechSynthesis } from '@vueuse/core';

  const VOICE_LANG = 'en-US';

  const props = withDefaults(defineProps<{ value: string }>(), {
    value: ''
  });

  const text = computed(() => props.value);
  const { speak } = useSpeechSynthesis(text, {
    lang: VOICE_LANG,
    pitch: 1,
    rate: 1,
    volume: 1
  });
</script>
<template>
  <VBtn
    :color="Colors.Primary"
    :icon="Icons.VolumeSource"
    :variant="Variants.Plain"
    @click="speak()"
  />
</template>
