<script setup lang="ts">
  import { watch } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { cloneDeep, mapValues } from 'lodash';
  import { useCRUD } from 'src/composables/useCRUD';
  import { generateId } from 'src/helpers/id-generator';
  import { FormInputProps } from 'components/VForm/types';
  import FormInput from 'components/VForm/VInput/FormInput.vue';

  type IModelValue = Array<Record<string, FormInputProps>>;
  interface Props {
    modelValue: IModelValue;
    config: IModelValue;
  }
  type _INPUT_EVENT_NAME = 'update:modelValue';
  const _INPUT_PROPS_KEY = 'modelValue';

  interface Emits {
    (event: _INPUT_EVENT_NAME, payload: IModelValue);
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const data = useVModel(props, _INPUT_PROPS_KEY, emit);
  const getBaseItem = () => ({
    id: generateId(),
    ...cloneDeep(data.value[0])
  });

  const { data: formInputItems, create, remove } = useCRUD<IModelValue>([], { returnAsObject: true });

  watch(
    () => formInputItems,
    () => {
      emit('update:modelValue', formInputItems.value);
    },
    {
      deep: true
    }
  );
</script>
<template>
  <div class="row justify-between q-pb-md full-width">
    <div class="text-h6">FormInputsList</div>
    <div><q-btn icon="add" class="border-secondary" flat dense @click="create(getBaseItem())" /></div>
  </div>
  <div class="form-input-list full-width">
    <div
      class="form-input-list__item row justify-between full-width"
      v-for="(rowInputs, rowIndex) in formInputItems"
      :key="rowIndex"
    >
      <div class="row justify-between">
        <div
          class="form-input-list__item--inputs"
          v-for="(inputField, inputIndex) in Object.keys(rowInputs)"
          :key="inputIndex"
        >
          <FormInput v-model="formInputItems[rowIndex][inputField]" />
        </div>
      </div>
      <div>
        <q-btn icon="delete" dense unelevated @click="remove(formInputItems[rowIndex].id)" flat />
      </div>
    </div>
    <div></div>
  </div>
</template>
