<script lang="ts" setup>
  import AnimationFade from '@/shared/ui/Animation/AnimationFade.vue';

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
