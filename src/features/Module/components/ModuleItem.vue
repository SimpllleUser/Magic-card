<script setup lang="ts">
  import { IModule } from 'src/features/module/types';
  import { useModalPlugin } from 'src/shared/composables/useModalPlugin';

  interface Props {
    module: IModule;
  }

  interface Emits {
    (event: 'on-edit', payload: IModule): void;
    (event: 'on-remove', payload: string): void;
    (event: 'view_detail', payload: string): void;
  }

  const confirmModalTexts = {
    title: 'Are you want remove module ?'
  };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const { confirm } = useModalPlugin();

  const confirmModal = () => {
    confirm({
      ...confirmModalTexts,
      onOk: () => {
        emit('on-remove', props.module.id);
      }
    });
  };
</script>

<template>
  <q-card flat bordered class="modules-item">
    <q-card-section class="bg-accent text-white">
      <div class="text-h6">{{ module.title }}</div>
      <div class="text-subtitle2">{{ module.description }}</div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right" class="modules-item__actions">
      <q-btn flat @click="emit('view-detail', module.id)" color="primary" icon="play_arrow" />
      <q-btn flat @click="emit('on-edit', module)" color="primary" icon="edit" />
      <q-btn flat @click="confirmModal" color="primary" icon="delete" />
    </q-card-actions>
  </q-card>
</template>

<style scoped lang="scss">
  $max-zIndex: 999999;
  .modules-item {
    position: relative;
    transition: 0.3s all;
    &__actions {
      position: absolute;
      z-index: $max-zIndex * -1;
      transition: all 0.3s linear;
      transform: translateY(-100px);
      width: 100%;
    }
    &:hover {
      .modules-item__actions {
        transform: translateY(-3rem);
        z-index: $max-zIndex;
      }
    }
  }
</style>
src/features/module/module
