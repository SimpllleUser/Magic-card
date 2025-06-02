<script setup lang="ts">
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import { Colors, Sizes, Variants } from '@/core/models/enums';
  import { Dictionary } from '../model/types';
  import { PageNames } from '@/router/types';
  import { Icons } from '@/core/models/icons';
  import { Icon } from 'base-form/src/core/types/icons';

  const props = defineProps<{ dictionary: Dictionary }>();
  const emit = defineEmits<{
    (event: 'remove', id: string): void;
    (event: 'sync', dictionary: Dictionary): void;
    (event: 'update', dictionary: Dictionary): void;
    (event: 'copy', dictionary: Dictionary): void;
  }>();

  const router = useRouter();

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

  function onMakeCopy() {
    emit('copy', props.dictionary);
  }

  const items = [
    {
      title: 'Detail',
      action: () => {
        router.push({
          name: PageNames.DictionaryDetail,
          params: { id: props.dictionary.id }
        });
      },
      color: Colors.Primary,
      icon: 'mdi-information-outline' as Icon
    },
    {
      title: 'Edit',
      action: onEdit,
      color: Colors.Primary,
      icon: 'mdi-pencil-outline' as Icon
    },
    {
      title: 'Copy',
      action: onMakeCopy,
      color: Colors.Primary,
      icon: 'mdi-content-copy' as Icon
    },
    {
      title: 'Remove',
      action: onRemove,
      color: Colors.Error,
      icon: 'mdi-delete-outline' as Icon
    }
  ];
</script>

<template>
  <VCard elevation="2">
    <VCardTitle>
      <div class="d-flex justify-space-between align-center">
        <div class="w-0 flex-grow-1">
          <div class="text-h6 text-truncate">
            {{ props.dictionary.title }}
          </div>
        </div>
        <div>
          <VMenu>
            <template #activator="{ props }">
              <VBtn
                :icon="Icons.DotsVertical"
                :variant="Variants.Text"
                v-bind="props"
              ></VBtn>
            </template>

            <VList>
              <VHover
                v-for="(item, index) in items"
                :key="index"
              >
                <template v-slot:default="{ isHovering, props }">
                  <VListItem
                    :base-color="isHovering ? item.color : ''"
                    :value="index"
                    v-bind="props"
                    @click="item.action"
                  >
                    <template #prepend>
                      <v-icon :icon="item.icon"></v-icon>
                    </template>
                    <VListItem-title>{{ item.title }}</VListItem-title>
                  </VListItem>
                </template>
              </VHover>
            </VList>
          </VMenu>
          <VBtn
            v-if="!props.dictionary.userId"
            :size="Sizes.Small"
            :variant="Variants.Text"
            @click.stop="onSync"
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
      <div class="text-truncate description">
        {{ props.dictionary.description }}
      </div>
    </VCardSubtitle>
  </VCard>
</template>

<style scoped lang="scss">
  .description {
    height: 3.5rem;
  }
</style>
