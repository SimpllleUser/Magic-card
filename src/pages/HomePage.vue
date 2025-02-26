<script lang="ts" setup>
  import { useDictionaryStore } from '@/stores/dictionary';
  import { Dictionary } from '@/features/dictionary/model/types';
  import { Colors, Sizes, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import ConfirmModal from '@/shared/ui/ConfirmModal/ConfirmModal.vue';
  import DictionaryCard from '@/features/dictionary/ui/DictionaryCard.vue';

  const router = useRouter();
  const modal = useModalStore();

  const dictionaryStore = useDictionaryStore();

  const updateDictionary = (dictionary: Dictionary | Record<string, unknown>) => {
    router.push({ name: 'DictionaryUpdate', params: { id: dictionary.id } });
  };

  const createDictionary = () => {
    router.push({ name: 'DictionaryCreate' });
  };

  const onRemoveDictionary = (id: string) => {
    modal.show(Modals.DictionaryConfirmRemove, {
      title: 'Remove dictionary',
      description: 'Are you sure you want to delete this dictionary?',
      type: Colors.Error,
      onConfirm: () => {
        dictionaryStore.remove(id);
      }
    });
  };
</script>

<template>
  <VRow class="pa-4">
    <ConfirmModal :id="Modals.DictionaryConfirmRemove" />
    <VCol v-for="dictionary in dictionaryStore.items" :key="dictionary.id" cols="4">
      <DictionaryCard :dictionary="dictionary" @remove="onRemoveDictionary" @update="updateDictionary" />
    </VCol>
    <VCol>
      <VBtn class="big-square-button" :color="Colors.Primary" :variant="Variants.Tonal" @click="createDictionary">
        <VIcon :icon="Icons.Add" :size="Sizes.XLarge" />
      </VBtn>
    </VCol>
  </VRow>
</template>
<style lang="scss" scoped>
  .big-square-button {
    width: 125px;
    height: 125px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
