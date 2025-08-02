<script setup lang="ts">
  import { useBreakPointsApp } from '@/shared/use/useBreakPointsApp';
  import BreadcrumbsDesktop from '@/layouts/ui/Breadcrumbs/BreadcrumbsDesktop.vue';
  import BreadcrumbsMobile from '@/layouts/ui/Breadcrumbs/BreadcrumbsMobile.vue';
  import { useBreadcrumbs } from '../../model/useBreadcrumbs';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const { isMobile } = useBreakPointsApp();
  const { breadcrumbs } = useBreadcrumbs();

  const mobileActualPage = computed(() => breadcrumbs.value.slice(-1)[0]);

  const isOne = computed(() => breadcrumbs.value.length === 1);

  const isLast = (index: number) => {
    return index === breadcrumbs.value.length - 1;
  };
</script>

<template>
  <div class="d-flex align-center">
    <TransitionGroup
      class="d-flex align-center"
      name="list"
      tag="div"
    >
      <BreadcrumbsDesktop
        v-if="!isMobile"
        :breadcrumbs="breadcrumbs"
        :is-last="isLast"
        :is-one="isOne"
        :router="router"
      />
      <BreadcrumbsMobile
        v-else
        :actual-title="mobileActualPage.title"
        :breadcrumbs="breadcrumbs"
        :is-last="isLast"
        :is-one="isOne"
        :router="router"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
  .list-enter-active {
    transition: all 0.3s ease;
  }

  .list-leave-active {
    transition: all 0.3s ease;
    position: absolute;
  }

  .list-enter-from {
    opacity: 0;
    transform: translateX(-20px);
  }

  .list-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }

  .list-move {
    transition: all 0.3s ease;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
  }
</style>
