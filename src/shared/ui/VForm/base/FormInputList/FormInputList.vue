<script setup lang="ts">
  import { watch } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { cloneDeep } from 'lodash';
  import { useCRUD } from 'src/shared/composables/useCRUD';
  import { generateId } from 'src/helpers/id-generator';
  import { IFormInput } from 'src/shared/ui/VForm/base';
  import { FormInput } from 'src/shared/ui/VForm/base/FormInput';

  // type IModelValue = Array<Record<string, IFormInput>>;
  interface Props {
    modelValue: IFormInput;
    config: IFormInput;
  }

  interface Emits {
    (event: 'update:modelValue', payload: IFormInput): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const data = useVModel(props, 'modelValue', emit);
  const getBaseItem = () => ({
    id: generateId(),
    ...cloneDeep(props.config)
  });

  const onCreate = () => {
    create(getBaseItem());
    onEmitValue();
  };
  const onRemove = (id: string) => {
    remove(id);
    onEmitValue();
  };

  const { data: formInputItems, create, remove } = useCRUD<IFormInput & { id: string }>([], { returnAsObject: true });
  formInputItems.value.forEach(onCreate);

  const onEmitValue = () => {
    emit('update:modelValue', formInputItems.value);
  };

  watch(
    () => props.modelValue,
    (value) => {
      formInputItems.value = value;
    },
    {
      deep: true
    }
  );
</script>
<template>
  <div class="row justify-between q-pb-md full-width">
    <div class="text-h6">FormInputsList</div>
    <div><q-btn icon="add" class="border-secondary" flat dense @click="onCreate" /></div>
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
        <q-btn icon="delete" dense unelevated @click="onRemove(formInputItems[rowIndex].id)" flat />
      </div>
    </div>
    <div></div>
  </div>
</template>
