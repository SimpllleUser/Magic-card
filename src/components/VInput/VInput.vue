<script setup lang="ts">
  import { computed, useSlots } from 'vue';
  import { QInputProps } from 'quasar';
  import { omit } from 'lodash';
  import { useVModel } from '@vueuse/core';
  import { IForm } from 'components/VInput/types';

  type ModelValue = Pick<QInputProps, 'modelValue'>;

  interface Emits {
    (event: '', payload: ModelValue): void;
  }

  const props = defineProps<QInputProps & { form: IForm }>();

  const emit = defineEmits<Emits>();

  const slotsKeys = ['default', 'prepend', 'append', 'before', 'after', 'label', 'error', 'hint', 'counter', 'loading'];
  const slots = useSlots();
  const activeSlots = computed(() => slotsKeys.filter((slot) => Object.keys(slots).includes(slot)));

  const data = useVModel(props, 'modelValue', emit);

  const params = omit(props, 'modelValue');
</script>

<template>
  <div>
    <q-input v-model="data" v-bind="params">
      <template v-for="slot in activeSlots" :key="slot" #[slot]="data">
        <slot :name="slot" :props="data"></slot>
      </template>
    </q-input>
  </div>
</template>

<style lang="scss" scoped></style>
