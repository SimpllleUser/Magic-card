<script setup lang="ts">
  import Breadcrumbs from '@/layouts/ui/Breadcrumbs/index.vue';
  import AuthBlock from '@/features/auth/ui/AuthBlock.vue';
  import ThemeButton from '@/shared/ui/ThemeButton.vue';

  const router = useRouter();
</script>

<template>
  <VToolbar
    class="header"
    color="surface-light"
    :elevation="1"
  >
    <VAppBarTitle>
      <div class="d-flex align-center mr-auto">
        <VBtn
          icon
          @click="router.push({ path: '/' })"
        >
          <img
            alt="MagicCardLogo"
            src="../../assets/logo-main.svg"
            width="25px"
          />
        </VBtn>
        <div class="title-wrapper justify-center mx-auto">
          <Breadcrumbs />
        </div>
      </div>
    </VAppBarTitle>

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
