<script setup lang="ts">
  import { computed } from 'vue';
  import { ActionForm } from 'components/VForm/types';
  import { UseFormResult } from 'components/VForm/composables/useForm';

  interface Props {
    action: ActionForm;
    config: UseFormResult;
  }

  interface Emits {
    (event: 'on-submit', payload: Record<string, any>): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const onSubmitHandler = () => {
    props.config.onSubmit(() => {
      if (!props.config.isValid.value) return;
      emit('on-submit', props.config.formDataValue.value);
    });
  };

  const _SAVE = 'Save';
  const _CREATE = 'Create';
  const _RESET = 'Reset';

  const actionName = computed(() => (props.action ? _SAVE : _CREATE));
</script>

<template>
  <div>
    <q-form @submit="onSubmitHandler" class="q-gutter-md">
      <div class="form-body">
        <slot />
      </div>
      <div class="row justify-end">
        <q-btn :label="actionName" type="submit" color="primary" />
        <q-btn :label="_RESET" @click="config.onReset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<style scoped lang="scss"></style>
