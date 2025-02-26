<script lang="ts" setup>
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
import { PageNames } from '@/router/types';

  const router = useRouter();

  const goToHome = () => {
    router.push({
      name: PageNames.Home
    });
  };
</script>

<template>
  <div class="page-404">
    <VEmptyState headline="Whoops, 404" :icon="Icons.Search" title="Page not found">
      <template #text>
        <div>
          <VBtn :append-icon="Icons.Home" :color="Colors.Primary" :variant="Variants.Tonal" @click="goToHome">
            Pleas try go to home page</VBtn
          >
        </div>
      </template>
    </VEmptyState>
  </div>
</template>

<style lang="scss" scoped>
  .page-404 {
    display: grid;
    place-items: center;
    height: 100vh;
    text-align: center;
  }
</style>
