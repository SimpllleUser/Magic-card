<script setup lang="ts">
  import { watchEffect } from 'vue';
  import { separateByString } from '../helpers/separates';
  import { Icons } from '@/core/models/icons';

  interface Props {
    modelValue: string;
    separatorWordItems: string;
    separatorDefinition: string;
  }

  interface Emit {
    (event: 'update:modelValue', value: string): void;
    (event: 'update-separated-value', value: Array<Array<string>>): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emit>();

  const LABEL = 'Enter words';
  const PLACEHOLDER = 'Enter words to split';
  const ROW = 1;

  const baseInputConfig = {
    label: LABEL,
    placeholder: PLACEHOLDER,
    rows: ROW,
    autogrow: true
  };

  const emitSeparatedValue = () => {
    const value = separateByString(props.modelValue, props.separatorWordItems)
      .map((item) => separateByString(item, props.separatorDefinition))
      .map((item) => (item.length <= 2 ? item : [item[0], item.slice(1).join(props.separatorDefinition)]));
    emit('update-separated-value', value);
  };

  watchEffect(emitSeparatedValue);

  const handleInput = (value: string) => {
    emit('update:modelValue', value);
    emitSeparatedValue();
  };

  // TODO separate logic to composable and use in parser text to dictionary
</script>

<template>
  <div class="row no-wrap items-center">
    <div class="full-width">
      <VInput
        v-model="props.modelValue"
        class="full-width"
        v-bind="baseInputConfig"
        @input="handleInput"
      />
    </div>
    <div>
      <VBtn
        :icon="Icons.Refresh"
        @click="emitSeparatedValue"
      />
    </div>
  </div>
</template>
