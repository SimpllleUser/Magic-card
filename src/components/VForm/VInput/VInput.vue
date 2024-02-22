<script setup lang="ts">
  import { defineProps, defineEmits, ref, useSlots, watch } from 'vue';
  import { QInputProps } from 'quasar';
  import { omit } from 'lodash';
  import { EXCESS_PROPS } from 'components/VForm/VInput/constants';
  import { FormInputItem } from 'components/VForm/types';

  const props = defineProps<QInputProps & { modelValue: FormInputItem }>();

  const internalProps = omit(props, EXCESS_PROPS);

  const emit = defineEmits<{ (event: 'update:modelValue', payload: FormInputItem): void }>();

  const internalValue = ref(props.modelValue.value);

  const activeSlots = useSlots();

  watch(internalValue, () => {
    emit('update:modelValue', { ...props.modelValue, value: internalValue.value });
  });
</script>

<template>
  <q-input
    v-model="internalValue"
    v-on="$attrs"
    :bind="internalProps"
    :error="Boolean(modelValue.error)"
    :error-message="modelValue.error"
    bottom-slots
  >
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </q-input>
</template>
