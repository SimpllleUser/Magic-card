<script setup lang="ts">
  import { Colors, Icons, Modals, Sizes, Variants } from '@/core';
  import { Dictionary } from '../model/types';
  import { PageNames } from '@/router/types';
  import { useModalStore } from '@/shared';

  const props = defineProps<{ dictionary: Dictionary; isMobile?: boolean }>();
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
      icon: Icons.InformationOutline
    },
    {
      title: 'Edit',
      action: onEdit,
      color: Colors.Primary,
      icon: Icons.PencilOutline
    },
    {
      title: 'Copy',
      action: onMakeCopy,
      color: Colors.Primary,
      icon: Icons.ContentCopy
    },
    {
      title: 'Remove',
      action: onRemove,
      color: Colors.Error,
      icon: Icons.DelteOutline
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
          <VMenu v-if="!isMobile">
            <template #activator="{ props: menuProps }">
              <VBtn
                :icon="Icons.DotsVertical"
                :variant="Variants.Text"
                v-bind="menuProps"
              ></VBtn>
            </template>

            <VList>
              <VHover
                v-for="(item, index) in items"
                :key="index"
              >
                <template #default="{ isHovering, props: hoverProps }">
                  <VListItem
                    :base-color="isHovering ? item.color : ''"
                    :value="index"
                    v-bind="hoverProps"
                    @click="item.action"
                  >
                    <template #prepend>
                      <VIcon :icon="item.icon" />
                    </template>
                    <VListItem-title>{{ item.title }}</VListItem-title>
                  </VListItem>
                </template>
              </VHover>
            </VList>
          </VMenu>
          <VBtn
            v-if="!dictionary?.userId"
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
      <div
        v-if="isMobile"
        class="py-2 d-flex justify-space-between align-center"
      >
        <VBtn
          v-for="(item, index) in items"
          :key="index"
          :variant="Variants.Contained"
          @click="item.action"
        >
          <VIcon
            :color="item.color"
            :icon="item.icon"
          />
        </VBtn>
      </div>
    </VCardSubtitle>
  </VCard>
</template>

<style scoped lang="scss">
  .description {
    height: 3.5rem;
  }
</style>
