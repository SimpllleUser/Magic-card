<script setup lang="ts">
  import { Colors, Icons } from '@/core';

  defineProps<{
    isMobile?: boolean;
  }>();

  defineEmits<{
    (event: 'restart'): void;
    (event: 'finish'): void;
  }>();
</script>

<template>
  <div class="d-flex justify-center pt-12">
    <VBtn
      class="mr-4"
      :color="Colors.Primary"
      @click="$emit('restart')"
    >
      <span v-if="isMobile">
        <VIcon :icon="Icons.Refresh" />
      </span>
      <span v-else>Restart</span>
    </VBtn>
    <VBtn
      :color="Colors.Primary"
      @click="$emit('finish')"
    >
      <span v-if="isMobile">
        <VIcon :icon="Icons.FlagCheckered" />
      </span>
      <span v-else>Finish</span>
    </VBtn>
  </div>
</template>
