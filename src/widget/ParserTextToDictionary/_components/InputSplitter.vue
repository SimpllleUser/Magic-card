<script setup lang="ts">
  import { computed, defineEmits, defineProps, watch } from 'vue';
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

  const inputValue = computed({
    get: () => props.modelValue,
    set: (value: string) => {
      emit('update:modelValue', value);
    }
  });

  watch(
    () => [inputValue.value, props.separatorDefinition, props.separatorWordItems],
    (value: string) => {
      emit('update-separated-value', separatedValue(value));
    }
  );

  const separatedValue = (text: string): Array<Array<string>> =>
    separateByString(inputValue.value, props.separatorWordItems)
      .map((item: string) => separateByString(item, props.separatorDefinition))
      .map((item: Array<string>) => {
        if (item.length <= 2) return item;
        return [item[0], item.slice(1).join(', ')];
      });

  const handleUpdateSeparatedValue = () => {
    emit('update-separated-value', separatedValue(inputValue.value));
  };
</script>

<template>
  <div class="row no-wrap items-center">
    <div class="full-width">
      <VInput v-model="inputValue" class="full-width" v-bind="baseInputConfig" />
    </div>
    <div>
      <VBtn :icon="Icons.Refresh" @click="handleUpdateSeparatedValue" />
    </div>
  </div>
</template>
