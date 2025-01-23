<script lang="ts" setup>
  import DefaultHeader from './components/DefaultHeader.vue';
</script>

<template>
  <v-app>
    <DefaultHeader />
    <v-main class="px-4 mt-4">
      <transition name="scale" mode="out-in">
        <router-view />
      </transition>
    </v-main>
    <AppFooter />
  </v-app>
</template>
<style>
  .scale-enter-active,
  .scale-leave-active {
    transition: all 0.5s ease;
  }

  .scale-enter-from,
  .scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }
</style>
