<script setup lang="ts">
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import { Colors, Sizes, Variants } from '@/core/models/enums';
  import { Dictionary } from '../model/types';
  import { PageNames } from '@/router/types';
  import { Icons } from '@/core/models/icons';

  const props = defineProps<{ dictionary: Dictionary }>();
  const emit = defineEmits<{
    (event: 'remove', id: string): void;
    (event: 'sync', dictionary: Dictionary): void;
    (event: 'update', dictionary: Dictionary): void;
  }>();

  const modal = useModalStore();

  function onEdit() {
    modal.show(Modals.DictionaryUpdate);
    emit('update', props.dictionary);
  }

  function onSync() {
    emit('sync', props.dictionary);
  }

  function onRemove() {
    emit('remove', props.dictionary.id);
  }
</script>

<template>
  <VCard
    elevation="2"
    link
  >
    <VCardTitle>
      <div class="d-flex justify-space-between align-center">
        <div class="w-0 flex-grow-1">
          <div class="text-h6 text-truncate">{{ props.dictionary.title }}</div>
        </div>
        <div>
          <VBtn
            v-if="!props.dictionary.userId"
            @click.stop="onSync"
            :size="Sizes.Small"
            :variant="Variants.Text"
          >
            <VIcon
              :color="Colors.Primary"
              :icon="Icons.CloudSyncOutline"
              size="24"
            />
          </VBtn>
        </div>
      </div>
    </VCardTitle>
    <VCardSubtitle>
      {{ props.dictionary.description }}
    </VCardSubtitle>
    <VCardActions>
      <VBtn
        :color="Colors.Primary"
        :to="{ name: PageNames.DictionaryDetail, params: { id: props.dictionary.id } }"
      >
        Detail
      </VBtn>
      <VBtn
        :color="Colors.Secondary"
        @click="onEdit"
      >
        Edit
      </VBtn>
      <VBtn
        :color="Colors.Error"
        @click="onRemove"
      >
        Remove
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped lang="sass"></style>
