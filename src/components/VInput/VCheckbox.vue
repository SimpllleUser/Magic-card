<script setup lang="ts">
  import { defineProps, defineEmits, ref, watchEffect, useSlots, computed } from 'vue';
  import { QCheckboxProps } from 'quasar';
  import { EXCESS_PROPS } from 'components/VInput/constants';
  import { omit } from 'lodash';

  const props = defineProps<QCheckboxProps>();

  const internalProps = omit(props, EXCESS_PROPS);

  const emit = defineEmits<{ (event: 'update:modelValue', payload: any): void }>();

  const internalValue = ref(props.modelValue);

  const activeSlots = useSlots();

  const internalRules = computed(() => props.modelValue?.rules || []);

  watchEffect(() => {
    internalValue.value = props.modelValue;
  });

  const onInput = (value: boolean) => {
    emit('update:modelValue', { ...props.modelValue, value });
  };
</script>

<template>
  <q-checkbox v-model="internalValue" :bind="internalProps" @input="onInput" v-on="$attrs" :rules="internalRules">
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </q-checkbox>
</template>
