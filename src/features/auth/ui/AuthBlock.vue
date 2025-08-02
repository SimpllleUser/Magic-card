<script setup lang="ts">
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useAuthStore } from '@/stores/auth';
  import { useBreakPointsApp } from '@/shared/use/useBreakPointsApp';

  const authStore = useAuthStore();

  const { isMobile } = useBreakPointsApp();
</script>

<template>
  <div class="d-flex items-center justify-center">
    <div
      v-if="authStore.isAuthenticated"
      class="d-flex align-center"
    >
      <div>
        <VAvatar>
          <img
            alt="avatar"
            class="avatar-image"
            :src="authStore.userData.picture"
          />
          <VMenu activator="parent">
            <VList class="px-2">
              <span>
                <b> {{ authStore.userData.name }}</b>
              </span>
              <VBtn
                class="ml-2"
                :color="Colors.Error"
                :icon="Icons.Logout"
                :variant="Variants.Text"
                @click="authStore.logout"
              />
            </VList>
          </VMenu>
        </VAvatar>
      </div>
      <span
        v-if="!isMobile"
        class="pl-2"
      >
        <b> {{ authStore.userData.name }}</b>
      </span>
      <VBtn
        v-if="!isMobile"
        class="ml-2"
        :color="Colors.Error"
        :icon="Icons.Logout"
        :variant="Variants.Text"
        @click="authStore.logout"
      />
    </div>
    <div v-if="!authStore.isAuthenticated">
      <VBtn
        :color="Colors.Primary"
        :variant="Variants.Outlined"
        @click="authStore.login"
      >
        <span class="pr-2">Login</span>
        <VIcon
          :color="Colors.Warning"
          :icon="Icons.Google"
        />
      </VBtn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .avatar-image {
    object-fit: cover;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
</style>
