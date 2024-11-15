<script setup lang="ts">
  import { ActionForm, BaseForm } from 'base-form/src/shared/ui/form/BaseForm';
  import { InputForm } from 'base-form/src/shared/ui/inputs/components/input-form';
  import { TopicFormModel, useTopicForm } from '@/features/Topics/TopicForm/config';
  import { BaseModal, useModalStore } from '@/shared/ui/BaseModal';
  import ParserTextToDictionary from '../../../widget/ParserTextToDictionary/index.vue';
  import { Topic } from '@/core/models/Topic';
  import InputList from 'base-form/src/shared/ui/inputs/components/input-list/InputList.vue';
  import { Colors, Variants } from '@/core/models/enums';
  import { Modals } from '@/core/models/modals';

  interface Props {
    formData?: Topic;
    modalId: Modals.TopicUpdate | Modals.TopicCreate;
  }

  interface Emits {
    (event: 'submit', payload: Topic): void;
  }

  const modal = useModalStore();
  const emit = defineEmits<Emits>();

  const props = withDefaults(defineProps<Props>(), {
    formData: {}
  });

  const modalTitle = computed(() => (props.modalId === Modals.TopicUpdate ? 'Topic update' : 'Topic create'));
  const action = computed(() => (props.formData?.id ? ActionForm.Save : ActionForm.Create));

  const onSubmit = (params: Ref<Topic | Omit<Topic, 'id'>>) => {
    console.log(params.isValid);
    if (params.isValid) emit('submit', params.value);
  };

  const onSetWords = (words: Array<Array<string>>, dicationary: unknown) => {
    words.forEach(([from, to]) => {
      dicationary.addByData({ from, to });
    });
    modal.hide(Modals.ImportWords);
  };
</script>

<template>
  <BaseForm :config="useTopicForm(formData)" :params="{ action }" @on-submit="onSubmit">
    <template #default="{ form }: { form: TopicFormModel }">
      <div class="mb-4">
        <InputForm v-model="form.title" />
      </div>
      <div class="mb-4">
        <InputForm v-model="form.description" />
      </div>
      <div class="mb-4">
        <BaseModal :id="Modals.ImportWords" title="Import words">
          <ParserTextToDictionary @set-words="onSetWords($event, form.dictionary)" />
        </BaseModal>
        <InputList v-model="form.dictionary" label="Dictionary">
          <template #btn-add="{ addItem }">
            <VBtn :color="Colors.Primary" :variant="Variants.Outlined" @click="modal.show(Modals.ImportWords)">
              Import
            </VBtn>
            <VBtn class="ml-4" :color="Colors.Primary" @click="addItem">Add</VBtn>
          </template>
        </InputList>
      </div>
    </template>
  </BaseForm>
</template>

<style scoped lang="sass"></style>
