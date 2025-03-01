<script setup lang="ts">
  import { Icons } from '@/core/models/icons';
  import { useBreadcrumbs } from '../model/useBreadcrumbs';

  const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <VBreadcrumbs :items="breadcrumbs">
    <template v-slot:divider>
      <VIcon icon="mdi-chevron-right" />
    </template>
    <template v-slot:prepend>
      <VIcon :icon="Icons.ViewCarouselIcon" />
    </template>
  </VBreadcrumbs>
</template>
