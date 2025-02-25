<script setup lang="ts">
  import { ActionForm, BaseForm, OnSubmitPayload } from 'base-form/src/shared/ui/form/BaseForm';
  import { InputForm } from 'base-form/src/shared/ui/inputs/components/input-form';
  import { TopicFormModel, useTopicForm } from '@/features/Topics/TopicForm/config';
  import { BaseModal, useModalStore } from '@/shared/ui/BaseModal';
  import ParserTextToDictionary from '../../../widget/ParserTextToDictionary/index.vue';
  import { Topic } from '@/core/models/Topic';
  import InputList from 'base-form/src/shared/ui/inputs/components/input-list/InputList.vue';
  import { Colors, Variants } from '@/core/models/enums';
  import { Modals } from '@/core/models/modals';
  import { useTopicsStore } from '../store/topics';

  interface Props {
    formData?: Topic;
    modalId: Modals.TopicUpdate | Modals.TopicCreate;
  }

  interface Emits {
    (event: 'submit', payload: Topic): void;
  }

  const router = useRouter();
  const modal = useModalStore();
  const emit = defineEmits<Emits>();

  const topicsStore = useTopicsStore();

  const props = withDefaults(defineProps<Props>(), {
    formData: {}
  });

  const action = computed(() => (props.formData?.id ? ActionForm.Save : ActionForm.Create));

  const onSubmit = (params: OnSubmitPayload<Ref<Topic | Omit<Topic, 'id'>>>) => {
    if (!params.isValid) return;
    console.log(params.value);

    const action = params.action === ActionForm.Create ? topicsStore.create : topicsStore.update;
    action(params.value);
    router.push({ name: 'Home' });
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
      <div class="pt-4 px-4 bg-surface mb-4 elevation-1 rounded">
        <div class="mb-4">
          <InputForm v-model="form.title" />
        </div>
        <div>
          <InputForm v-model="form.description" />
        </div>
      </div>
      <div class="mb-4 bg-surface pa-4 elevation-1 rounded">
        <BaseModal :id="Modals.ImportWords" title="Import words">
          <ParserTextToDictionary @set-words="onSetWords($event, form.dictionary)" />
        </BaseModal>
        <InputList v-model="form.dictionary" header-class="border-b-md" label="Dictionary">
          <template #label="{label}">
            <div class="text-h6 text-on-surface-variant">{{ label }}</div>
          </template>
          <template #btn-add="{ addItem }">
            <div>
              <VBtn :color="Colors.Primary" :variant="Variants.Text" @click="modal.show(Modals.ImportWords)">
                Import
              </VBtn>
              <VBtn class="ml-4" :color="Colors.Secondary" :variant="Variants.Text" @click="addItem">Add</VBtn>
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

<style scoped lang="sass"></style>
