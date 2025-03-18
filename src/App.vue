<script lang="ts" setup>
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
import { useDictionaryStore } from './stores/dictionary';

  const dictionaryStore = useDictionaryStore();

  onMounted( async () => {
    if (dictionaryStore.items.length) {
      await dictionaryStore.saveDictionaryOnCloudFromStorage();
    }
    if (!dictionaryStore.items.length) {
      await dictionaryStore.saveDictionaryOnStorageFromCloud();
    }
  });
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
