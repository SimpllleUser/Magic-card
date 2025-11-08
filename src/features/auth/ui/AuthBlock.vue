<script setup lang="ts">
  import { Colors, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useAuthStore } from '@/features/auth';
  import { useBreakPointsApp } from '@/shared';

  const authStore = useAuthStore();

  const loginUser = async () => {
    await authStore.login();
    await authStore.initUser();
  };

  const { isMobile } = useBreakPointsApp();
  onMounted(async () => {
    await authStore.initUser();
  });
</script>

<template>
  <div class="d-flex items-center justify-center">
    <div
      v-if="authStore.isAuth"
      class="d-flex align-center"
    >
      <div>
        <!-- <VAvatar>
          <img
            alt="avatar"
            class="avatar-image"
            :src="authStore.userData.picture"
          />
          <VMenu activator="parent">
            <VList class="pl-4">
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
        </VAvatar> -->
      </div>
      <span
        v-if="!isMobile"
        class="pl-2"
      >
        <b> {{ authStore.user?.name }}</b>
      </span>
      <VBtn
        v-if="!isMobile"
        class="ml-2 mr-6"
        :color="Colors.Error"
        :icon="Icons.Logout"
        :variant="Variants.Text"
        @click="authStore.logout"
      />
    </div>
    <div v-if="!authStore.isAuth">
      <VBtn
        :color="Colors.Primary"
        :variant="Variants.Outlined"
        @click="loginUser"
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
