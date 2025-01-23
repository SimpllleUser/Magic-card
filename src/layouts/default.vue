<script lang="ts" setup>
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
  import DefaultHeader from './components/DefaultHeader.vue';
</script>

<template>
  <v-app>
    <DefaultHeader />
    <v-main class="px-4 mt-4">
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
  .transition-wrapper {
    overflow: hidden;
    transition: height 0.3s ease;
    height: auto;
  }

  .content {
    position: relative;
  }
</style>
