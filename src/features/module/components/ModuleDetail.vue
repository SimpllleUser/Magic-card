<script lang="ts" setup>
  import { IModule } from '../types/module';
  import VModal from 'src/shared/ui/VModal/_index.vue';
  import WordsList from 'src/features/module/ModuleDetail/WordsList.vue';

  interface Props {
    module: IModule;
  }

  interface Emits {
    (event: 'hide'): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const MODAL_ID = 'detail-module';
</script>

<template>
  <v-modal
    :id="MODAL_ID"
    title="Module detail"
    @hide="
      () => {
        emit('hide');
      }
    "
  >
    <q-card class="q-mb-sm">
      <q-card-section>
        <div class="text-h6">{{ module.title }}</div>
        <div class="text-subtitle2">{{ module.description }}</div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section class="q-pb-sm">
        <WordsList :words="module.words || []" />
      </q-card-section>
    </q-card>
  </v-modal>
</template>

<style scoped></style>
