<script lang="ts" setup>
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
  import { useAuthStore } from './stores/auth';
  import { useDictionaryStore } from './stores/dictionary';
  const authStore = useAuthStore();
  const dictionaryStore = useDictionaryStore();

  watch(
    () => authStore.isAuthenticated,
    async (value: boolean) => {
      if (value) {
        await dictionaryStore.syncDataBetweenStoragesData();
      }
    },
    { immediate: true }
  );
</script>

<template>
  <v-app>
    <v-main>
      <AnimationFade>
        <router-view />
      </AnimationFade>
    </v-main>
  </v-app>
</template>
