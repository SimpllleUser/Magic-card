<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { separateByString } from '../helpers/separates';

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
  const BUTTON_REFRESH_CONFIG = {
    icon: 'system_update_alt',
    color: 'primary',
    outline: true,
    flat: true
  };

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
    () => inputValue.value,
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

  watch(() => [props.separatorDefinition, props.separatorWordItems], handleUpdateSeparatedValue);
</script>

<template>
  <div class="row no-wrap items-center">
    <div class="full-width">
      <q-input class="full-width" v-model="inputValue" v-bind="baseInputConfig" />
    </div>
    <div>
      <q-btn v-bind="BUTTON_REFRESH_CONFIG" @click="handleUpdateSeparatedValue" />
    </div>
  </div>
</template>
