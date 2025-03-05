<script lang="ts" setup>
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
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
    :icon="Icons.VolumeSource"
    @click="speak()"
    :color="Colors.Primary"
    :variant="Variants.Plain"
  />
</template>
