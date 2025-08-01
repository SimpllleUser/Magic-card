<script setup lang="ts">
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useAuthStore } from '@/stores/auth';

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.initUserData();
  });
</script>

<template>
  <div class="d-flex items-center justify-center">
    <div v-if="authStore.isAuthenticated">
      <v-chip
        :color="Colors.Info"
        :variant="Variants.Flat"
      >
        <b> {{ authStore.userName }}</b>
      </v-chip>
      <VBtn
        class="ml-2"
        :color="Colors.Error"
        :icon="Icons.Logout"
        :variant="Variants.Text"
        @click="authStore.singOut"
      >
      </VBtn>
    </div>
    <div v-if="!authStore.isAuthenticated">
      <VBtn
        :color="Colors.Primary"
        @click="authStore.signIn"
      >
        <span> Sign in </span>
        <VIcon
          class="ml-2"
          :color="Colors.Warning"
          :icon="Icons.Google"
        />
      </VBtn>
    </div>
  </div>
</template>
