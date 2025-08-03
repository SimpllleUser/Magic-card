<script setup lang="ts">
  import { Icons } from '@/core/models/icons';
  import { Colors, Variants } from '@/core/models/enums';
  import type Router from '@/router';

  defineProps<{
    actualTitle: string;
    breadcrumbs: { path: string; title: string; to: string }[];
    router: Router;
    isLast: (index: number) => boolean;
    isOne: boolean;
  }>();
</script>

<template>
  <div class="w-100">
    <div class="px-2 d-flex align-center justify-center">
      <div v-if="!isOne">
        <span class="text-primary">
          {{ actualTitle }}
          <VMenu
            activator="parent"
            location="bottom"
          >
            <VList>
              <VListItem
                v-for="(item, index) in breadcrumbs"
                :key="item.to"
              >
                <VBtn
                  class="w-100"
                  :color="isLast(index) ? Colors.Primary : Colors.Grey"
                  :variant="Variants.Text"
                  @click="router.push(item.to)"
                >
                  <div>
                    {{ item.title }}
                  </div>
                </VBtn>
              </VListItem>
            </VList>
          </VMenu>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .mobile-title {
    max-width: 90%;
  }
</style>
