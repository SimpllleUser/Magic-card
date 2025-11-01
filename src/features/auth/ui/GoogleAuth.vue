<script setup lang="ts">
  import { Account, Client, OAuthProvider } from 'appwrite';

  const client = new Client();
  client.setEndpoint(import.meta.env.VITE_CLOUD_SERVICE_URL).setProject(import.meta.env.VITE_PROJECT_ID);

  const account = new Account(client);

  defineOptions({ name: 'GoogleAuth' });

  const loginWithGoogle = () => {
    // account.createOAuth2Session(OAuthProvider.Google, 'http://localhost:3000/', 'http://localhost:3000//login?error=1');
    account.createOAuth2Session(OAuthProvider.Google, 'https://magic-card.fun', 'https://magic-card.fun/login?error=1');
  };

  const user = ref<any>();
  onMounted(async () => {
    const result = await account.get();
    console.log(result);
    user.value = result;
  });
</script>

<template>
  <div
    v-if="user"
    class="text-h6 text-center"
  >
    {{ user?.name }}
  </div>
  <div>
    <VBtn @click="loginWithGoogle"> Sign in with Google </VBtn>
  </div>
</template>
