<script setup lang="ts">
  import Breadcrumbs from '@/layouts/ui/Breadcrumbs/index.vue';
  import { AuthBlock } from '@/features/auth/';
  import ThemeButton from '@/shared/ui/ThemeButton.vue';
  // import GoogleAuth from '@/features/auth/ui/GoogleAuth.vue';

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
        <!-- <div class="mx-6">
          <GoogleAuth />
        </div> -->
        <div class="title-wrapper justify-center mx-auto">
          <Breadcrumbs />
        </div>
      </div>
    </VAppBarTitle>

    <template #append>
      <ThemeButton />
      <AuthBlock class="ml-4 mr-4" />
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
