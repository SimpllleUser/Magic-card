<script setup lang="ts">
  import { ActionForm, BaseForm } from 'base-form/src/shared/ui/form/BaseForm';
  import { InputForm } from 'base-form/src/shared/ui/inputs/components/input-form';
  import { TopicForm, useTopicForm } from '@/features/Topics/TopicForm/config';
  import ParserTextToDictionary from '../../../widget/ParserTextToDictionary/index.vue';
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

  const distionary = ref([]);
  const emit = defineEmits<Emits>();

  const props = withDefaults(defineProps<Props>(), {
    formData: {}
  });

  const action = computed(() => (props.formData?.id ? ActionForm.Update : ActionForm.Create));

  const onSubmit = (params: Ref<Topic | Omit<Topic, 'id'>>) => {
    console.log(params.isValid);
    if (params.isValid) emit('submit', params.value);
  };

  const setWords = (words: Array<Array<string>>, dicationary: unknown) => {
    // console.log(words[0]);
    // console.log(dicationary);
    words.forEach(([from, to]) => {
      dicationary.addByData({ from, to });
    });
  };
</script>

<template>
  <BaseForm :config="useTopicForm(formData)" :params="{ action }" @on-submit="onSubmit">
    <template #default="{ form }: { form: TopicForm }">
      <div class="mb-4">
        <InputForm v-model="form.title" />
      </div>
      <div class="mb-4">
        <InputForm v-model="form.description" />
      </div>
      <div class="mb-4">
        <ParserTextToDictionary @set-words="setWords($event, form.dictionary)" />
        <InputList v-model="form.dictionary" label="Dicitionary" />
      </div>
    </template>
  </BaseForm>
</template>

<style scoped lang="sass"></style>
