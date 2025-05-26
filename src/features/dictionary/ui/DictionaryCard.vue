<script setup lang="ts">
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import { defineEmits } from 'vue';
  import { Colors, Sizes, Variants } from '@/core/models/enums';
  import { Dictionary } from '../model/types';
  import { PageNames } from '@/router/types';
  import { Icons } from '@/core/models/icons';

  interface Props {
    dictionary: Dictionary;
  }

  interface Emits {
    (event: 'remove', id: string): void;
    (event: 'sync', dictionary: Dictionary): void;
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
  <VCard
    elevation="2"
    link
  >
    <VCardTitle>
      <div class="d-flex justify-space-between align-center">
        <div class="w-0 flex-grow-1">
          <div class="text-h6 text-truncate">{{ dictionary.title }}</div>
        </div>
        <div>
          <VBtn
            v-if="!dictionary?.userId"
            @click.stop="emit('sync', dictionary)"
            :size="Sizes.Small"
            :variant="Variants.Text"
          >
            <VIcon
              :color="Colors.Primary"
              :icon="Icons.CloudSyncOutline"
              size="24"
          /></VBtn>
        </div>
      </div>
    </VCardTitle>
    <VCardSubtitle>
      {{ dictionary.description }}
    </VCardSubtitle>
    <VCardActions>
      <VBtn
        :color="Colors.Primary"
        :to="{ name: PageNames.DictionaryDetail, params: { id: dictionary.id } }"
        >Detail</VBtn
      >
      <VBtn
        :color="Colors.Secondary"
        @click="onUpdateDictionary(dictionary)"
        >Edit</VBtn
      >
      <VBtn
        :color="Colors.Error"
        @click="$emit('remove', dictionary.id)"
        >Remove</VBtn
      >
    </VCardActions>
  </VCard>
</template>

<style scoped lang="sass"></style>
