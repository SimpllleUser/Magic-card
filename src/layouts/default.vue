<script lang="ts" setup>
  import DefaultHeader from './components/DefaultHeader.vue';
</script>

<template>
  <v-app>
    <DefaultHeader />
    <v-main class="px-4 mt-4">
      <div class="transition-wrapper">
        <transition name="fade-scale" mode="out-in">
          <div :key="$route.fullPath" class="content">
            <router-view />
          </div>
        </transition>
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

  .fade-scale-enter-active,
  .fade-scale-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .fade-scale-enter-from,
  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }

  .content {
    position: relative;
  }
</style>
