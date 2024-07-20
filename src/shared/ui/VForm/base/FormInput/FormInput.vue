<script setup lang="ts">
  import { computed, defineEmits, defineProps, Ref, useSlots } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { isString, omit } from 'lodash';
  import { rules } from 'src/shared/lib/use/validation/rules';
  import { IFormInput, IUseFormInput, components } from 'src/shared/ui/VForm';

  const props = defineProps<{ modelValue: IFormInput }>();

  const internalProps = computed(() => omit(props.modelValue, ['value']));

  const componentType = computed(() => {
    if (!props.modelValue) return 'div';
    return components[props.modelValue.component];
  });

  const emit = defineEmits<{ (event: 'update:modelValue', payload: IUseFormInput): void }>();
  const data: Ref<IFormInput> = useVModel(props, 'modelValue', emit);

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

<style lang="scss" scoped>
  @import './styles.scss';
</style>
