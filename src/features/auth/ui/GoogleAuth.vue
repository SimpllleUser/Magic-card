<script setup lang="ts">
  import { Account, Client, OAuthProvider } from 'appwrite';

  const client = new Client();
  client.setEndpoint(import.meta.env.VITE_CLOUD_SERVICE_URL).setProject(import.meta.env.VITE_PROJECT_ID);

  const account = new Account(client);

  defineOptions({ name: 'GoogleAuth' });

  const loginWithGoogle = () => {
    account.createOAuth2Session(OAuthProvider.Google, 'https://magic-card.fun', 'https://magic-card.fun/login?error=1');
  };
</script>

<template>
  <div>
    <VBtn @click="loginWithGoogle"> Sign in with Google </VBtn>
  </div>
</template>
