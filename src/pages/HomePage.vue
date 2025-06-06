<script lang="ts" setup>
  import { useDictionaryStore } from '@/stores/dictionary';
  import { Colors, Sizes, Variants } from '@/core/models/enums';
  import { Icons } from '@/core/models/icons';
  import { useModalStore } from '@/shared/ui/BaseModal';
  import { Modals } from '@/core/models/modals';
  import ConfirmModal from '@/shared/ui/ConfirmModal/ConfirmModal.vue';
  import DictionaryCard from '@/features/dictionary/ui/DictionaryCard.vue';
  import { PageNames } from '@/router/types';
  import { Dictionary } from '@/features/dictionary/model/types';
  import { VueDraggableNext } from 'vue-draggable-next';
  import { useSessionStorage } from '@vueuse/core';
  import { omit } from 'lodash';
  import { makeCopyDictionary } from '@/features/dictionary/model/utils';

  const router = useRouter();
  const modal = useModalStore();

  const dictionaryStore = useDictionaryStore();

  const updateDictionary = (dictionary: Dictionary | Record<string, unknown>) => {
    router.push({ name: PageNames.DictionaryUpdate, params: { id: dictionary.id } });
  };

  const createDictionary = () => {
    router.push({ name: PageNames.DictionaryCreate });
  };

  const onRemoveDictionary = (id: string) => {
    modal.show(Modals.DictionaryConfirmRemove, {
      title: 'Remove dictionary',
      description: 'Are you sure you want to delete this dictionary?',
      type: Colors.Error,
      onConfirm: () => {
        dictionaryStore.removeWithCloud(dictionaryStore.getById(id));
      }
    });
  };

  const onCopy = (dictionary: Dictionary) => {
    router.push({
      name: PageNames.DictionaryCreate
    });

    useSessionStorage('dictionaryCopy', makeCopyDictionary(dictionary));
  };

  const allowMove = (evt) => Boolean(evt.draggedContext.element);

  onMounted(async () => {
    await dictionaryStore.fetchDictionarys();
  });
</script>

<template>
  <VRow class="pa-4">
    <ConfirmModal :id="Modals.DictionaryConfirmRemove" />
    <TransitionGroup name="list">
      <VueDraggableNext
        v-model="dictionaryStore.items"
        class="v-row"
        :move="allowMove"
      >
        <VCol
          v-for="dictionary in dictionaryStore.items"
          :key="dictionary.id"
          cols="4"
        >
          <DictionaryCard
            :dictionary="dictionary"
            @copy="onCopy"
            @remove="onRemoveDictionary"
            @sync="dictionaryStore.saveToCloud"
            @update="updateDictionary"
          />
        </VCol>
        <VCol key="add-button">
          <VBtn
            class="big-square-button"
            :color="Colors.Primary"
            :variant="Variants.Tonal"
            @click="createDictionary"
          >
            <VIcon
              :icon="Icons.Add"
              :size="Sizes.XLarge"
            />
          </VBtn>
        </VCol>
      </VueDraggableNext>
    </TransitionGroup>
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

  .list-enter-active {
    transition: all 0.5s ease;
  }

  .list-leave-active {
    transition: all 0.5s ease;
    position: absolute;
    width: 33.333%;
  }

  .list-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
    max-height: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  .list-move {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }

  .v-row {
    position: relative;
  }

  :deep(.v-col) {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
</style>
