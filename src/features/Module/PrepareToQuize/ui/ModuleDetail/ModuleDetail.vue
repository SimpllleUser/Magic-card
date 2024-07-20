<script lang="ts" setup>
  import { VModal } from 'src/shared/ui/VModal';
  import { WordsList } from 'src/shared/ui/Words';
  import { IModule } from 'src/entities/Module';
  import { MODAL } from './constants';

  interface Props {
    module: IModule;
  }

  interface Emits {
    (event: 'hide'): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
</script>

<template>
  <VModal :id="MODAL.ID" :title="MODAL.TITLE" @hide="emit('hide')">
    <q-card class="q-mb-sm">
      <q-card-section>
        <div class="text-h6">{{ module.title }}</div>
        <div class="text-subtitle2">{{ module.description }}</div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section class="q-pb-sm" v-if="module.words.length">
        <WordsList :module-id="module.id" :words="module.words" />
      </q-card-section>
    </q-card>
  </VModal>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
