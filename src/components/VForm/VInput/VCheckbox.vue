<script setup lang="ts">
  import { defineProps, defineEmits, ref, useSlots, watch } from 'vue';
  import { QCheckboxProps } from 'quasar';
  import { EXCESS_PROPS } from 'components/VForm/VInput/constants';
  import { omit } from 'lodash';
  import { FormCheckItem } from 'components/VForm/types';
  import { useVModel } from '@vueuse/core';

  const props = defineProps<QCheckboxProps & { modelValue: FormCheckItem }>();

  const internalProps = omit(props, EXCESS_PROPS);

  const emit = defineEmits<{ (event: 'update:modelValue', payload: FormCheckItem): void }>();

  const data = useVModel(props, 'modelValue', emit);

  const activeSlots = useSlots();

  const onChangeInput = () => {
    emit('update:modelValue', { ...props.modelValue, value: data.value.value });
  };
</script>

<template>
  <q-checkbox
    v-model="data.value"
    :bind="internalProps"
    v-on="$attrs"
    @update:model-value="onChangeInput"
    :error="Boolean(modelValue.error)"
    :error-message="modelValue.error"
  >
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </q-checkbox>
</template>
