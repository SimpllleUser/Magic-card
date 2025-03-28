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
        :variant="Variants.Flat"
        :color="Colors.Info"
      >
        <b> {{ authStore.userName }}</b>
      </v-chip>
      <VBtn
        class="ml-2"
        :color="Colors.Error"
        :variant="Variants.Text"
        :icon="Icons.Logout"
        @click="authStore.singOut"
      >
      </VBtn>
    </div>
    <div v-if="!authStore.isAuthenticated">
      <VBtn
        :color="Colors.Primary"
        @click="authStore.signIn"
      >
        Sign in <VIcon :icon="Icons.Google" :color="Colors.Warning" class="ml-2" />
      </VBtn>
    </div>
  </div>
</template>
