<script lang="ts" setup>
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
  import DefaultHeader from './components/DefaultHeader.vue';
</script>

<template>
  <v-app>
    <DefaultHeader />
    <v-main class="px-4 mt-4 mx-auto main-content">
      <div class="transition-wrapper">
        <AnimationFade>
          <div :key="$route.fullPath" class="content">
            <router-view />
          </div>
        </AnimationFade>
      </div>
    </v-main>
    <AppFooter />
  </v-app>
</template>
<style lang="scss" scoped>
  .main-card {
    height: calc(100% - 2rem);
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
