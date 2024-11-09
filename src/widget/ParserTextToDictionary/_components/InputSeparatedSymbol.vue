<script setup lang="ts">
  import { computed, defineEmits, ref, watch, withDefaults } from 'vue';
  import { BASE_SEPARATED_SYMBOLS, SELECTOR_LABEL, TEXT_INPUT_LABEL } from '../constants';

  interface Props {
    modelValue: string;
    label?: string;
  }

  interface Emit {
    (event: 'update:modelValue', value: string): void;
  }

  interface Option {
    label: string;
    value: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    label: 'Separated symbol'
  });
  const emit = defineEmits<Emit>();

  const handleEmitUpdateModelValue = (value: string) => {
    emit('update:modelValue', value);
  };

  const separatdeSymbol = computed({
    get: () => props.modelValue,
    set: (value: string | Option) => {
      handleEmitUpdateModelValue(typeof value === 'object' && 'value' in value ? value.value : value);
    }
  });

  const isCustomSeparator = ref(false);
  // separatdeSymbol.value = BASE_SPARATED_SYMBOLS[0].value;

  watch(
    () => isCustomSeparator.value,
    (value: string) => {
      separatdeSymbol.value = value ? '' : BASE_SEPARATED_SYMBOLS[0].value;
    }
  );

  // const separatdeSymbolSelected = computed(() => {
  //   return BASE_SEPARATED_SYMBOLS.find((item) => item.value === separatdeSymbol.value);
  // });
</script>

<template>
  <div>
    <div>
      <div>
        <VCheckbox v-model="isCustomSeparator" class="pl-0" hide-details label="Use custom" />
      </div>
    </div>
    <div class="flex">
      <div v-if="isCustomSeparator" class="full-width">
        <VTextField v-model="separatdeSymbol" filled :label="TEXT_INPUT_LABEL" />
      </div>
      <div v-else class="full-width">
        <VSelect
          v-model="separatdeSymbol"
          class="selector-separated-symbol"
          filled
          item-title="label"
          item-value="value"
          :items="BASE_SEPARATED_SYMBOLS"
          :label="label"
        />
      </div>
    </div>
  </div>
</template>

<style>
  .selector-separated-symbol {
    min-width: 10rem;
  }
</style>
