<script setup lang="ts">
  import { QInputProps } from 'quasar';
  import { defineProps, defineEmits, ref, useSlots, watch } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { omit } from 'lodash';
  import { EXCESS_PROPS } from 'components/VForm/VInput/constants';
  import { FormCheckItem } from 'components/VForm/types';

  const props = defineProps<QInputProps & { modelValue: FormCheckItem }>();

  const internalProps = omit(props, EXCESS_PROPS);

  const emit = defineEmits<{ (event: 'update:modelValue', payload: FormCheckItem): void }>();
  const data = useVModel(props, 'modelValue', emit);

  const activeSlots = useSlots();

  const onChangeInput = () => {
    emit('update:modelValue', data.value);
  };
</script>

<template>
  <q-input
    v-model="data.value"
    :label="data.label"
    :hint="data.hint"
    v-on="$attrs"
    @update:model-value="onChangeInput"
    :bind="internalProps"
    bottom-slots
    :error="Boolean(modelValue.error)"
    :error-message="modelValue.error"
  >
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </q-input>
</template>
