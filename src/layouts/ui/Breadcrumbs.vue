<script setup lang="ts">
import { Icons } from '@/core/models/icons';
import { useBreadcrumbs } from '../model/useBreadcrumbs';
import { Variants } from '@/core/models/enums';
import { useRouter } from 'vue-router';

const router = useRouter();
const { breadcrumbs } = useBreadcrumbs();


const isOnlyOne = computed(() => breadcrumbs.value.length === 1);
const isLast = (index: number) => {
  return index === breadcrumbs.value.length - 1;
}
</script>

<template>
  <TransitionGroup name="list" tag="div" class="d-flex align-center">
    <div
      v-for="(item, index) in breadcrumbs"
      :key="item.to"
      class="breadcrumb-item d-flex align-center"
    >
      <VIcon v-show="!index" :icon="Icons.ViewCarouselIcon" />
      <VBtn
        :variant="Variants.Text"
        :disabled="isOnlyOne || isLast(index)"
        @click="router.push(item.to)"
      >
        {{ item.title }}
      </VBtn>
      <VIcon v-show="!isLast(index)" :icon="Icons.ChevronRight" />
    </div>
  </TransitionGroup>
</template>

<style scoped>
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
