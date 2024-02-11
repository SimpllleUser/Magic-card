<script setup lang="ts">
  import { defineProps, defineEmits, ref, watchEffect, useSlots } from 'vue';
  import { QInputProps } from 'quasar';
  import { NumberOrString } from 'boot/types';

  const props = defineProps<QInputProps>();

  const emit = defineEmits<{ (event: 'update:modelValue', payload: NumberOrString): void }>();

  const internalValue = ref(props.modelValue);

  watchEffect(() => {
    internalValue.value = props.modelValue;
  });

  const onInput = (value: NumberOrString) => {
    emit('update:modelValue', value);
  };

  const activeSlots = useSlots();
</script>

<template>
  <q-input v-model="internalValue" v-bind="props" @input="onInput" v-on="$attrs">
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </q-input>
</template>
