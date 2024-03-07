<script setup lang="ts">
  import { computed, defineEmits, defineProps, useSlots } from 'vue';
  import { IUseFormInput, ValidationRule } from 'components/VForm/types';
  import { isString, omit } from 'lodash';
  import { useVModel } from '@vueuse/core';
  import { components } from 'components/VForm/VInput/form-inputs';
  import { rules } from 'components/VForm/composables/rules';

  type _INPUT_EVENT_NAME = 'update:modelValue';
  const _INPUT_PROPS_KEY = 'modelValue';

  const props = defineProps<{ modelValue: any }>();

  const internalProps = computed(() => omit(props.modelValue, ['value']));

  const componentType = computed(() => components[props.modelValue.component]);

  const emit = defineEmits<{ (event: _INPUT_EVENT_NAME, payload: IUseFormInput): void }>();
  const data = useVModel(props, _INPUT_PROPS_KEY, emit);

  const activeSlots = useSlots();

  const onChangeInput = () => {
    emit('update:modelValue', data.value);
  };

  const errorMessage = computed(() =>
    internalProps.value._rules
      ?.map((key) => rules[key](data.value.value))
      .filter(isString)
      .at(0)
  );
  const error = computed(() => Boolean(errorMessage.value));
</script>
<template>
  {{ errorMessage }}
  <component
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
