<script setup lang="ts">
  import { ref } from 'vue';
  import { VSnackbar, VCard, VCardTitle, VCardText } from 'vuetify/components';
  import { ToastOptions } from './index';

  const props = defineProps<{ location: string }>();

  const toasts = ref<ToastOptions[]>([]);

  defineExpose({ toasts });

  const locationClass = computed(() => {
    return props.location.replace(' ', '-');
  });
</script>

<template>
  <div :class="['toast-container', locationClass]">
    <TransitionGroup
      name="toast-fade"
      tag="div"
    >
      <div
        v-for="(toast, index) in toasts"
        :key="toast.id"
        :color="toast.color"
        :location="toast.location"
        class="mb-2"
      >
        <VCard
          :color="toast.color"
          :variant="toast.variant"
        >
          <VCardTitle v-if="toast.title">{{ toast.title }} </VCardTitle>
          <VCardText>{{ toast.message }}</VCardText>
        </VCard>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
  .toast-container {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 12px; /* отступ между тостами */
    pointer-events: none;
  }

  .toast-container.top-right {
    top: 16px;
    right: 16px;
    align-items: flex-end;
  }

  .toast-container.top-left {
    top: 16px;
    left: 16px;
    align-items: flex-start;
  }

  .toast-container.bottom-right {
    bottom: 16px;
    right: 16px;
    align-items: flex-end;
  }

  .toast-container.bottom-left {
    bottom: 16px;
    left: 16px;
    align-items: flex-start;
  }

  .custom-toast {
    position: static !important; /* 🔥 убираем fixed */
    width: auto;
    max-width: 400px;
    pointer-events: auto;
  }
</style>
