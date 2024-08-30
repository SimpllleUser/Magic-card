<script lang="ts" setup>
  import { computed, defineProps, defineEmits } from 'vue';
  import { VTextInput } from 'src/shared/ui/InputConfigurator/models/TextInput';
  import { ABaseInput } from 'base-form/src/shared/ui/inputs/models';

  interface Props {
    modelValue: VTextInput;
  }

  interface Emits {
    (event: 'update:modelValue', payload: ABaseInput): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const input = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });

  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    input.value.value = target.value;
  };
</script>

<template>
  <q-input v-model="input.value" :value="input.value" :type="input.type" @input="onInput" />
</template>
