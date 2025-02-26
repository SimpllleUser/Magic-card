<script setup lang="ts">
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import { defineEmits } from 'vue';
  import { Colors } from '@/core/models/enums';
  import { Dictionary } from '../model/types';

  interface Props {
    dictionary: Dictionary;
  }

  interface Emits {
    (event: 'remove', id: string): void;
    (event: 'update', dictionary: Dictionary): void;
  }

  defineProps<Props>();
  const emit = defineEmits<Emits>();

  const modal = useModalStore();

  const onUpdateDictionary = (dictionary: Dictionary) => {
    modal.show(Modals.DictionaryUpdate);
    emit('update', dictionary);
  };
</script>

<template>
  <VCard elevation="2" link :title="dictionary.title">
    <VCardSubtitle>
      {{ dictionary.description }}
    </VCardSubtitle>
    <VCardActions>
      <VBtn :color="Colors.Primary" :to="{ name: 'DictionaryDetail', params: { id: dictionary.id } }">Detail</VBtn>
      <VBtn :color="Colors.Secondary" @click="onUpdateDictionary(dictionary)">Edit</VBtn>
      <VBtn :color="Colors.Error" @click="$emit('remove', dictionary.id)">Remove</VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped lang="sass"></style>
