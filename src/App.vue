<script lang="ts" setup>
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
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
