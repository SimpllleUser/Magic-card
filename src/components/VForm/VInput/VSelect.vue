<script setup lang="ts">
  import { defineProps, defineEmits, ref, watchEffect, useSlots, computed, watch } from 'vue';
  import { QSelectProps } from 'quasar';
  import { EXCESS_PROPS } from 'components/VForm/VInput/constants';
  import { omit } from 'lodash';
  import { FormSelectItem } from 'components/VForm/types';

  const props = defineProps<QSelectProps & { modelValue: FormSelectItem }>();

  const internalProps = omit(props, EXCESS_PROPS);

  const emit = defineEmits<{ (event: 'update:modelValue', payload: FormSelectItem): void }>();

  const internalValue = ref(props.modelValue?.value || '');

  const activeSlots = useSlots();

  watch(internalValue, () => {
    emit('update:modelValue', { ...props.modelValue, value: internalValue.value });
  });
</script>

<template>
  <q-select
    v-model="internalValue"
    :bind="internalProps"
    :error="Boolean(modelValue.error)"
    :error-message="modelValue.error"
    :options="modelValue.options"
    v-on="$attrs"
  >
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </q-select>
</template>
