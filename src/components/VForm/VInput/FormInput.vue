<script setup lang="ts">
  import { computed, defineEmits, defineProps, useSlots } from 'vue';
  import { IUseFormInput } from 'components/VForm/types';
  import { omit } from 'lodash';
  import { useVModel } from '@vueuse/core';
  import { components } from 'components/VForm/VInput/form-inputs';
  import FormInputList from 'components/VForm/VInput/FormInputList.vue';

  type _INPUT_EVENT_NAME = 'update:modelValue';
  const _INPUT_PROPS_KEY = 'modelValue';

  const props = defineProps<{ modelValue: IUseFormInput }>();

  const internalProps = omit(props.modelValue, ['value']);

  const componentType = computed(() => components[props.modelValue.component]);

  const emit = defineEmits<{ (event: _INPUT_EVENT_NAME, payload: IUseFormInput): void }>();
  const data = useVModel(props, _INPUT_PROPS_KEY, emit);

  const activeSlots = useSlots();

  const onChangeInput = () => {
    emit('update:modelValue', data.value);
  };
</script>
<template>
  <component
    :is="componentType"
    v-model="data.value"
    v-bind="internalProps"
    @update:model-value="onChangeInput"
    bottom-slots
    :error-message="modelValue.error"
    :error="Boolean(modelValue.error)"
  >
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </component>
</template>
