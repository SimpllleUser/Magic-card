<script lang="ts" setup>
  import DefaultHeader from './components/DefaultHeader.vue';
</script>

<template>
  <v-app>
    <DefaultHeader />
    <v-main class="px-4 mt-4">
      <!-- TODO add breadcramp -->
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>
