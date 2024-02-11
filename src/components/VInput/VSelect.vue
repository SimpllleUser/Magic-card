<script setup lang="ts">
  import { defineProps, defineEmits, ref, watchEffect, useSlots, computed } from 'vue';
  import { QSelectProps } from 'quasar';
  import { EXCESS_PROPS } from 'components/VInput/constants';
  import { omit } from 'lodash';

  const props = defineProps<QSelectProps & { modelValue: any }>();

  const internalProps = omit(props, EXCESS_PROPS);

  const emit = defineEmits<{ (event: 'update:modelValue', payload: any): void }>();

  const internalRules = computed(() => props.modelValue?.rules || []);

  const internalValue = ref(props.modelValue);

  const activeSlots = useSlots();

  watchEffect(() => {
    internalValue.value = props.modelValue;
  });

  const onInput = (value: boolean) => {
    emit('update:modelValue', { ...props.modelValue, value });
  };
</script>

<template>
  <q-select v-model="internalValue" :bind="internalProps" :rules="internalRules" @input="onInput" v-on="$attrs">
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </q-select>
</template>
