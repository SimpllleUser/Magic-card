<script setup lang="ts">
  withDefaults(
    defineProps<{
      mode?: 'out-in' | 'default' | 'in-out';
    }>(),
    {
      mode: 'out-in'
    }
  );
</script>

<template>
  <Transition :mode="mode" name="fade-scale">
    <slot></slot>
  </Transition>
</template>
<style lang="scss" scoped>
  .fade-scale-enter-active,
  .fade-scale-leave-active {
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .fade-scale-enter-from,
  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
</style>
