<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { SELECTOR_LABEL, TEXT_INPUT_LABEL, BASE_SPARATED_SYMBOLS } from './constants';

  interface Props {
    modelValue: string;
    title?: string;
  }

  interface Emit {
    (event: 'update:modelValue', value: string): void;
  }

  interface Option {
    label: string;
    value: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'Separated symbol'
  });
  const emit = defineEmits<Emit>();

  const handleEmitUpdateModelValue = (value: string) => {
    emit('update:modelValue', value);
  };

  const isCustomSeparator = ref(false);

  const separatdeSymbol = computed({
    get: () => props.modelValue,
    set: (value: string | Option) => {
      handleEmitUpdateModelValue(isCustomSeparator.value ? value : value.value);
    }
  });

  const seperatorTypeSwitcherLabel = computed(() =>
    isCustomSeparator.value ? 'Use default separators' : 'Use custom separator'
  );

  watch(
    () => isCustomSeparator.value,
    (value: string) => {
      separatdeSymbol.value = value ? '' : BASE_SPARATED_SYMBOLS[0].value;
    }
  );

  const separatdeSymbolSelected = computed(() => {
    return BASE_SPARATED_SYMBOLS.find((item) => item.value === separatdeSymbol.value);
  });
</script>

<template>
  <div>
    <div>
      <b>{{ title }}</b>
    </div>
    <div class="flex">
      <q-toggle v-model="isCustomSeparator" :label="label">
        <q-tooltip anchor="top middle"> {{ seperatorTypeSwitcherLabel }} </q-tooltip>
      </q-toggle>
      <div class="full-width" v-if="isCustomSeparator">
        <q-input filled v-model="separatdeSymbol" :label="TEXT_INPUT_LABEL" />
      </div>
      <div class="full-width" v-else>
        <q-select
          class="selector-separated-symbol"
          filled
          v-model="separatdeSymbol"
          :options="BASE_SPARATED_SYMBOLS"
          :label="SELECTOR_LABEL"
        >
          <template #selected>
            {{ separatdeSymbolSelected?.label || '' }}
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
