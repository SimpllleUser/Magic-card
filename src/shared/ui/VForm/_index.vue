<script setup lang="ts">
  import { computed } from 'vue';
  import { ActionForm } from './types';
  import { IFormEntity } from './useForm';

  interface Props {
    action: ActionForm;
    config: IFormEntity;
  }

  interface Emits {
    (event: 'on-submit', payload: Record<string, any>): void;
    (event: 'on-cancel'): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const onSubmitHandler = () => {
    props.config.onSubmit(() => {
      if (!props.config.isValid) return;
      emit('on-submit', props.config.formValue);
    });
  };

  const onCancel = () => {
    props.config.onReset();
    emit('on-cancel');
  };

  const _SAVE = 'Save';
  const _CREATE = 'Create';
  const _CANCEL = 'Cancel';

  const actionName = computed(() => (props.action ? _SAVE : _CREATE));
</script>

<template>
  <div>
    <q-form @submit="onSubmitHandler" class="q-gutter-md">
      <div class="form-body">
        <slot />
      </div>
      <div class="row justify-end">
        <q-btn
          :label="_CANCEL"
          @click="onCancel"
          color="text-dark"
          outline="secondary"
          flat
          class="q-ml-sm btn-cancel border-secondary q-mr-sm"
        />
        <q-btn :label="actionName" type="submit" color="secondary text-black" />
      </div>
    </q-form>
  </div>
</template>
