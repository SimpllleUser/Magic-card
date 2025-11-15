<script lang="ts" setup>
  import { useDictionaryStore } from '@/stores/dictionary';
  import { Colors, Icons, Modals, Sizes, Variants } from '@/core';
  import { ConfirmModal, http, useBreakPointsApp, useModalStore } from '@/shared';
  import { Dictionary, DictionaryCard, makeCopyDictionary } from '@/features/dictionary';
  import { PageNames } from '@/router/types';
  import { useSessionStorage } from '@vueuse/core';
  import { useAuthStore } from '@/features/auth';
  import { GoogleGenAI } from '@google/genai';

  const router = useRouter();
  const modal = useModalStore();

  const authStore = useAuthStore();
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

  const { isMobile } = useBreakPointsApp();

  watch(
    () => authStore.isAuth,
    async (state) => {
      if (!state) return;
      await dictionaryStore.fetchDictionaries();
    },
    {
      immediate: true
    }
  );
</script>

<template>
  <VRow class="pa-4">
    <ConfirmModal :id="Modals.DictionaryConfirmRemove" />
    <TransitionGroup name="list">
      <VContainer>
        <VRow>
          <VCol
            v-for="dictionary in dictionaryStore.items"
            :key="dictionary.id"
            cols="12"
            lg="4"
            md="4"
            sm="12"
            xl="4"
            xs="12"
            xxl="4"
          >
            <DictionaryCard
              :dictionary="dictionary"
              :is-mobile="isMobile"
              @copy="onCopy"
              @remove="onRemoveDictionary"
              @sync="dictionaryStore.saveToCloud"
              @update="updateDictionary"
            />
          </VCol>
          <VCol key="add-button">
            <VBtn
              class="big-square-button"
              :class="{ 'is-mobile-button-add': isMobile }"
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
        </VRow>
      </VContainer>
    </TransitionGroup>
  </VRow>
</template>
<style lang="scss" scoped>
  .is-mobile-button-add {
    width: 100% !important;
  }

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
