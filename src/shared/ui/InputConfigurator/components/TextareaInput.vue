<script lang="ts" setup>
  import { computed, defineProps, defineEmits } from 'vue';
  import { ABaseInput } from 'base-form/src/shared/ui/inputs/models';
  import { TextareaInput } from 'src/shared/ui/InputConfigurator/models/TextareaInput';

  interface Props {
    modelValue: TextareaInput;
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
  <q-input v-model="input.value" :value="input.value" :autogrow="input.isAutogrow" @input="onInput" type="textarea" />
</template>
