<script setup lang="ts">
  import { CANCEL_BUTTON, SUBMIT_BUTTON } from 'src/shared/ui/VForm/Form/constants';
  import { OnSubmitPayload, useForm, ActionForm } from 'base-form/src/shared/ui/form';
  import { defineProps, defineEmits, onMounted, computed, ref, watch } from 'vue';

  interface Props {
    config: unknown;
    params?: { action: ActionForm };
  }

  interface Emits {
    (event: 'on-submit', payload: OnSubmitPayload<unknown>): void;
  }

  const emit = defineEmits<Emits>();

  const props = defineProps<Props>();

  const formConfig = ref(useForm(props.config));
  watch(
    () => props.config,
    (newConfig) => {
      formConfig.value = useForm(newConfig);
    },
    { deep: true }
  );

  const onSubmit = (isValid: boolean): void => {
    emit('on-submit', {
      value: formConfig.value.getValue(),
      isValid,
      ...formConfig.value.getActionStates(props.params)
    });
  };

  onMounted(() => {
    formConfig.value.resetForm();
  });

  const submitButtonLabel = computed(() => formConfig.value.getAction(props?.params || {}));
  const showButtonAction = computed(() => !formConfig.value.isActionNone(props?.params || {}));
</script>

<template>
  <div>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="form-body">
        <slot :form="formConfig.form" />
      </div>
      <slot name="actions">
        <div class="row justify-end">
          <q-btn @click="formConfig.resetForm" v-bind="CANCEL_BUTTON" />
          <q-btn :label="submitButtonLabel" v-bind="SUBMIT_BUTTON" />
        </div>
      </slot>
    </q-form>
  </div>
</template>

<style scoped lang="scss">
  @import 'styles';
</style>
