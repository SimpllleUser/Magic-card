<script lang="ts" setup>
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';
import { useDictionaryStore } from './stores/dictionary';

  const dictionaryStore = useDictionaryStore();

  onMounted( async () => {
    await dictionaryStore.baseSyncLocalDictionaryWithClold();
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
