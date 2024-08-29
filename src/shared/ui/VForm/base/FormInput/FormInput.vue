<script setup lang="ts">
  import { computed, defineProps, defineEmits } from 'vue';
  import type { ABaseInput, TextInput } from 'base-form/src/shared/ui/inputs/models';

  interface Props {
    modelValue: TextInput;
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
</script>

<template>
  <label v-if="input.label" class="label">{{ input.label }}</label>
  <br />
  <component :is="input.component" v-model="input" />
  <br />
  <span class="hint" v-if="input.hint">{{ input.hint }}</span>
  <span v-if="!input.isValid()" class="invalid-field">
    {{ input.getErrors() }}
  </span>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
