<script setup lang="ts">
  import { defineProps, defineEmits, ref, watchEffect, useSlots, computed } from 'vue';
  import { QInputProps } from 'quasar';
  import { omit } from 'lodash';
  import { NumberOrString } from 'boot/types';
  import { EXCESS_PROPS } from 'components/VInput/constants';
  import { useInputErrors } from 'components/VInput/useInputErrors';

  const props = defineProps<QInputProps & { modelValue: any }>();

  const internalProps = omit(props, EXCESS_PROPS);

  const emit = defineEmits<{ (event: 'update:modelValue', payload: any): void }>();

  const internalValue = ref(props.modelValue?.value || '');

  const activeSlots = useSlots();

  const inputError = computed(() =>
    useInputErrors({
      rules: props.modelValue?.rules,
      value: internalValue
    })
  );

  watchEffect(() => {
    internalValue.value = props.modelValue?.value || '';
  });

  const onInput = (value: NumberOrString) => {
    emit('update:modelValue', { ...props.modelValue, value });
  };
</script>

<template>
  <q-input
    v-model="internalValue"
    @input="onInput"
    :bind="internalProps"
    v-on="$attrs"
    bottom-slots
    :error-message="inputError.internalErrors"
    :error="inputError.existError"
  >
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </q-input>
</template>
