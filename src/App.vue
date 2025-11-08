<script lang="ts" setup>
  import { AnimationFade } from '@/shared';
</script>

<template>
  <VApp>
    <VMain>
      <AnimationFade>
        <router-view />
      </AnimationFade>
    </VMain>
  </VApp>
</template>
