<script setup lang="ts">
  import { computed, watch } from 'vue';
  import { separateByString } from 'src/shared/lib/utils/separates';
  import { BASE_INPUT_CONFIG } from './constants';

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

  const inputValue = computed({
    get: () => props.modelValue,
    set: (value: string) => {
      emit('update:modelValue', value);
    }
  });

  watch(
    () => [inputValue.value, props.separatorWordItems, props.separatorDefinition],
    () => {
      if (!inputValue.value.trim().length) return;
      emit('update-separated-value', separatedValue(inputValue.value));
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
      <q-input class="full-width" v-model="inputValue" v-bind="BASE_INPUT_CONFIG" />
    </div>
    <!--    <div>
      <q-btn v-bind="BUTTON_REFRESH_CONFIG" @click="handleUpdateSeparatedValue" />
    </div>-->
  </div>
</template>
