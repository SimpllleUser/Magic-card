<script setup lang="ts">
  import { defineProps, defineEmits, ref, useSlots, watch } from 'vue';
  import { QCheckboxProps } from 'quasar';
  import { EXCESS_PROPS } from 'components/VForm/VInput/constants';
  import { omit } from 'lodash';
  import { FormCheckItem } from 'components/VForm/types';

  const props = defineProps<QCheckboxProps & { modelValue: FormCheckItem }>();

  const internalProps = omit(props, EXCESS_PROPS);

  const emit = defineEmits<{ (event: 'update:modelValue', payload: FormCheckItem): void }>();

  const internalValue = ref(props.modelValue.value);

  const activeSlots = useSlots();

  watch(internalValue, () => {
    emit('update:modelValue', { ...props.modelValue, value: internalValue.value });
  });
</script>

<template>
  <q-checkbox
    v-model="internalValue"
    :bind="internalProps"
    v-on="$attrs"
    :error="Boolean(modelValue.error)"
    :error-message="modelValue.error"
  >
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </q-checkbox>
</template>
