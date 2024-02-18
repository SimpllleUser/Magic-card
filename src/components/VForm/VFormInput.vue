<script setup lang="ts">
  import { InputTypes } from 'components/types';
  import { ref, computed, defineAsyncComponent } from 'vue';

  interface Props {
    type: InputTypes;
    modelValue: any;
  }

  const props = defineProps<Props>();

  const component = {
    'v-input': defineAsyncComponent(() => import('components/VInput/VInput.vue')),
    'v-checkbox': defineAsyncComponent(() => import('components/VInput/VCheckbox.vue')),
    'v-select': defineAsyncComponent(() => import('components/VInput/VSelect.vue'))
  };

  const activeComponent = computed(() => component[`v-${props.type}`]);

  const internalValue = ref(props.modelValue?.value || '');
</script>

<template>
  <div>
    <component v-model="internalValue" :is="activeComponent" :bind="$attrs" v-on="$attrs" />
  </div>
</template>
