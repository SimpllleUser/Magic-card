<script setup lang="ts">
  import { ActionForm, BaseForm } from 'base-form/src/shared/ui/form/BaseForm';
  import { InputForm } from 'base-form/src/shared/ui/inputs/components/input-form';
  import { TopicForm, useFormTopic } from '@/pages/Topics/components/TopicForm/index';
  import { Topic } from '@/core/models/Topic';
  import { BaseModal } from '@/shared/ui/BaseModal';

  interface Props {
    formData?: Topic;
    id: string;
    title: string;
  }

  interface Emits {
    (event: 'submit', payload: Topic): void;
  }

  const emit = defineEmits<Emits>();

  const props = withDefaults(defineProps<Props>(), {
    formData: {}
  });

  const action = computed(() => (props.formData?.id ? ActionForm.Update : ActionForm.Create));

  const onSubmit = (params: Ref<Topic | Omit<Topic, 'id'>>) => {
    console.log(params.value);
    emit('submit', params.value);
  };
</script>

<template>
  <BaseModal :id="id" :title="title">
    <BaseForm
      :config="useFormTopic(formData)"
      :params="{
        action
      }"
      @on-submit="onSubmit"
    >
      <template #default="{ form }: { form: TopicForm }">
        <InputForm v-model="form.title" />
        <InputForm v-model="form.description" />
      </template>
    </BaseForm>
  </BaseModal>
</template>

<style scoped lang="sass"></style>
