<script setup lang="ts">
  import { computed, defineEmits, defineProps, Ref, useSlots } from 'vue';
  import { isString, omit } from 'lodash';
  import { useVModel } from '@vueuse/core';
  import { rules } from 'src/shared/ui/VForm/validation/rules';
  import { IFormInput, IUseFormInput } from '../types';
  import { components } from 'src/shared/ui/VForm/constants';

  type _INPUT_EVENT_NAME = 'update:modelValue';
  const _INPUT_PROPS_KEY = 'modelValue';

  const props = defineProps<{ modelValue: IFormInput }>();

  const internalProps = computed(() => omit(props.modelValue, ['value']));

  const componentType = computed(() => {
    if (!props.modelValue) return 'div';
    return components[props.modelValue.component];
  });

  const emit = defineEmits<{ (event: _INPUT_EVENT_NAME, payload: IUseFormInput): void }>();
  const data: Ref<IFormInput> = useVModel(props, _INPUT_PROPS_KEY, emit);

  const activeSlots = useSlots();

  const onChangeInput = () => {
    emit('update:modelValue', data.value);
  };

  const errorMessage = computed(() =>
    internalProps.value._rules
      ?.map((key: string) => rules[key](data.value.value))
      .filter(isString)
      .at(0)
  );
  const error = computed(() => Boolean(errorMessage.value));
</script>
<template>
  <component
    v-if="internalProps && data"
    :is="componentType"
    v-model="data.value"
    v-bind="internalProps"
    @update:model-value="onChangeInput"
    bottom-slots
    :error-message="errorMessage"
    :error="error"
  >
    <template v-for="(_, slotName) in activeSlots" v-slot:[slotName] :key="slotName">
      <slot :name="slotName"></slot>
    </template>
  </component>
</template>
src/shared/ui/VForm/composables/rules
