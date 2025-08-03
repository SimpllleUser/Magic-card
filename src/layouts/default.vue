<script lang="ts" setup>
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
  import DefaultHeader from './ui/DefaultHeader.vue';
</script>

<template>
  <VApp class="app-wrapper">
    <DefaultHeader class="default-header" />
    <v-main class="mt-2 mb-8 mx-auto main-content">
      <div class="transition-wrapper">
        <AnimationFade>
          <div
            :key="$route.fullPath"
            class="content"
          >
            <router-view :key="$route.fullPath" />
          </div>
        </AnimationFade>
      </div>
    </v-main>
  </VApp>
</template>
<style lang="scss" scoped>
  .default-header {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .main-content {
    max-width: calc(1200px + 2rem);
    width: 100%;
    height: calc(90% - 2rem);
  }

  .transition-wrapper {
    overflow: hidden;
    transition: height 0.3s ease;
    height: auto;
  }

  .content {
    position: relative;
  }
</style>
