<script setup lang="ts">
  import Breadcrumbs from '@/layouts/ui/Breadcrumbs.vue';
  import AuthBlock from '@/features/auth/ui/AuthBlock.vue';
  import ThemeButton from '@/shared/ui/ThemeButton.vue';
</script>

<template>
  <VToolbar
    class="header"
    color="surface-light"
    :elevation="1"
  >
    <v-app-bar-title>
      <div class="title-wrapper">
        <Breadcrumbs />
      </div>
    </v-app-bar-title>

    <template #append>
      <ThemeButton />
      <AuthBlock class="ml-4" />
    </template>
  </VToolbar>
</template>
<style lang="scss" scoped>
  .header {
    :deep(.v-toolbar__content) {
      max-width: 1280px;
      margin: 0 auto;
    }
  }
  .title-wrapper {
    display: flex;
    align-items: center;
  }

  .title {
    position: absolute;
    transition: transform 0.3s ease;
    transform: tran slateX(0);
  }
  .with-btn-back {
    transform: translateX(50px);
  }
</style>
