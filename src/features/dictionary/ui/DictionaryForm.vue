<script setup lang="ts">
  import { ActionForm, BaseForm, OnSubmitPayload } from 'base-form/src/shared/ui/form/BaseForm';
  import { InputForm } from 'base-form/src/shared/ui/inputs/components/input-form';
  import { BaseModal, useModalStore } from '@/shared';
  import { ParserTextToDictionary } from '@/widgets';
  import InputList from 'base-form/src/shared/ui/inputs/components/input-list/InputList.vue';
  import { Colors, Modals, Variants } from '@/core';
  import { useDictionaryStore } from '@/stores/dictionary';
  import {
    Dictionary,
    DictionaryFormEmits,
    DictionaryFormModel,
    DictionaryFormProps,
    useDictionaryForm
  } from '@/features/dictionary';
  import { PageNames } from '@/router/types';

  const router = useRouter();
  const modal = useModalStore();
  const props = withDefaults(defineProps<DictionaryFormProps>(), {
    formData: {}
  });
  defineEmits<DictionaryFormEmits>();

  const dictionaryStore = useDictionaryStore();

  const action = computed(() => (props.formData?.id ? ActionForm.Save : ActionForm.Create));

  const onSubmit = async (params: OnSubmitPayload<Ref<Dictionary | Omit<Dictionary, 'id'>>>) => {
    if (!params.isValid) return;

    const action =
      params.action === ActionForm.Create ? dictionaryStore.createWithCloud : dictionaryStore.updateWithCloud;
    await action(params.value);
    router.push({ name: PageNames.Home });
  };

  const onSetWords = (words: Array<Array<string>>, dicationary: unknown) => {
    words.forEach(([from, to]) => {
      dicationary.addByData({ from, to });
    });
    modal.hide(Modals.ImportWords);
  };
</script>

<template>
  <BaseForm
    :config="useDictionaryForm(formData, action)"
    :params="{ action }"
    @on-submit="onSubmit"
  >
    <template #default="{ form }: { form: DictionaryFormModel }">
      <div class="py-4 px-4 bg-surface mb-4 elevation-1 rounded animated-container">
        <div class="mb-4">
          <InputForm v-model="form.title" />
        </div>
        <div>
          <InputForm v-model="form.description" />
        </div>
      </div>
      <div class="mb-4 bg-surface pa-4 elevation-1 rounded">
        <BaseModal
          :id="Modals.ImportWords"
          title="Import words"
        >
          <ParserTextToDictionary @set-words="onSetWords($event, form.items)" />
        </BaseModal>
        <InputList
          v-model="form.items"
          label="Dictionary"
          with-animation
        >
          <template #label="{ label }">
            <div class="text-h6 text-on-surface-variant">{{ label }}</div>
          </template>
          <template #btn-add="{ addItem }">
            <div>
              <VBtn
                :color="Colors.Primary"
                :variant="Variants.Text"
                @click="modal.show(Modals.ImportWords)"
              >
                Import
              </VBtn>
              <VBtn
                class="ml-4"
                :color="Colors.Secondary"
                :variant="Variants.Text"
                @click="addItem"
                >Add</VBtn
              >
            </div>
          </template>
          <template #empty>
            <div class="text-h6 text-center">You can add words for dictionary</div>
          </template>
        </InputList>
      </div>
    </template>
  </BaseForm>
</template>
