<script setup lang="ts">
  import { defineProps, defineEmits, ref, watchEffect, useSlots, computed, watch } from 'vue';
  import { QSelectProps } from 'quasar';
  import { useVModel } from '@vueuse/core';
  import { omit } from 'lodash';
  import { EXCESS_PROPS } from 'components/VForm/VInput/constants';
  import { FormSelectItem } from 'components/VForm/types';

  const props = defineProps<QSelectProps & { modelValue: FormSelectItem }>();

  const internalProps = omit(props, EXCESS_PROPS);

  const emit = defineEmits<{ (event: 'update:modelValue', payload: FormSelectItem): void }>();

  const data = useVModel(props, 'modelValue', emit);

  const activeSlots = useSlots();

  const onChangeInput = () => {
    emit('update:modelValue', { ...props.modelValue, value: data.value.value });
  };
</script>

<template>
  <q-select
    v-model="data.value"
    v-on="$attrs"
    @update:model-value="onChangeInput"
    v-bind="internalProps"
    :error="Boolean(modelValue.error)"
    :error-message="modelValue.error"
    :options="modelValue.options"
  >
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </q-select>
</template>
