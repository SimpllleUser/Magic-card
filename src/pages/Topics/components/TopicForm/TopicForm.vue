<script setup lang="ts">
  import { ActionForm, BaseForm } from 'base-form/src/shared/ui/form/BaseForm';
  import { InputForm } from 'base-form/src/shared/ui/inputs/components/input-form';
  import { TopicForm, useFormTopic } from '@/pages/Topics/components/TopicForm/index';
  import { Topic } from '@/core/models/Topic';
  import InputList from 'base-form/src/shared/ui/inputs/components/input-list/InputList.vue';

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
    console.log(params.isValid);
    if (params.isValid) emit('submit', params.value);
  };
</script>

<template>
  <BaseModal :id="id" :title="title">
    <BaseForm :config="useFormTopic(formData)" :params="{ action }" @on-submit="onSubmit">
      <template #default="{ form }: { form: TopicForm }">
        <div class="mb-4">
          <InputForm v-model="form.title" />
        </div>
        <div class="mb-4">
          <InputForm v-model="form.description" />
        </div>
        <div class="mb-4">
          <InputList label="Dicitionary" v-model="form.dictionary" />
        </div>
      </template>
    </BaseForm>
  </BaseModal>
</template>

<style scoped lang="sass"></style>
