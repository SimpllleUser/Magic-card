<script setup lang="ts">
  import { FORM_ACTIONS, CANCEL_BUTTON, SUBMIT_BUTTON } from 'src/shared/ui/VForm/Form/constants';
  import { computed } from 'vue';
  import { ActionForm } from 'src/shared/ui/VForm/Form/types';
  import { IFormEntity } from 'src/shared/ui/VForm';

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

  const actionName = computed(() => (props.action ? FORM_ACTIONS.SAVE : FORM_ACTIONS.CREATE));

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
</script>

<template>
  <div>
    <q-form @submit="onSubmitHandler" class="q-gutter-md">
      <div class="form-body">
        <slot />
      </div>
      <div class="row justify-end">
        <q-btn @click="onCancel" v-bind="CANCEL_BUTTON" />
        <q-btn :label="actionName" v-bind="SUBMIT_BUTTON" />
      </div>
    </q-form>
  </div>
</template>

<style scoped lang="scss">
  @import 'styles';
</style>
