<script setup lang="ts">
  import { Router } from 'vue-router';
  import { Colors, Icons, Variants } from '@/core';

  defineProps<{
    router: Router;
    actualTitle: string;
    breadcrumbs: { path: string; title: string; to: string }[];
    isLast: (index: number) => boolean;
    isOne: boolean;
  }>();
</script>

<template>
  <div class="d-flex align-center">
    <div
      v-for="(item, index) in breadcrumbs"
      :key="item.to"
      class="breadcrumb-item d-flex align-center"
    >
      <VBtn
        class="ml-2"
        :color="!isOne && isLast(index) ? Colors.Primary : Colors.Grey"
        :variant="Variants.Text"
        @click="router.push(item.to)"
      >
        {{ item.title }}
      </VBtn>
      <VIcon
        v-show="!isLast(index)"
        :icon="Icons.ChevronRight"
      />
    </div>
  </div>
</template>
