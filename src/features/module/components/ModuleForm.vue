<script setup lang="ts">
  import { ref, toRefs } from 'vue';
  import VModal from 'src/shared/ui/VModal/_index.vue';
  import VForm from 'src/shared/ui/VForm/_index.vue';
  import FormInput from 'src/shared/ui/VForm/_components/FormInput.vue';
  import WordsForm from 'src/features/words/components/WordsForm.vue';
  import { useForm } from 'src/shared/ui/VForm/useForm';
  import { useModulesStore } from 'src/features/module/store/modules';
  import { EntityUnform } from 'boot/types';
  import { IModule } from 'src/features/module/types/module';
  import { computed } from 'vue';
  import { getFormConfig, IModuleFormConfig } from 'src/features/module/types/form';
  import { ActionForm } from 'src/shared/ui/VForm/types';
  import { WordEntity } from 'src/features/words/types/word';
  import { cloneDeep } from 'lodash';

  interface Props {
    module?: IModule;
    formId: string;
  }

  const props = defineProps<Props>();

  const moduleStore = useModulesStore();

  const wordsList = ref<Array<WordEntity>>([]);

  const generateForm = (params?: IModule) => useForm(getFormConfig(params || {}));

  const form = ref(generateForm());

  const { inputs } = toRefs<{ inputs: IModuleFormConfig }>(form.value);

  const onShowModal = () => {
    if (!props.module?.id) return;
    form.value = generateForm(props.module);
    wordsList.value = cloneDeep(props.module.words);
  };

  const onSubmit = (data: EntityUnform<IModule>, action: CallableFunction) => {
    const storeAction = props.module?.id ? moduleStore.update : moduleStore.create;
    console.log(wordsList.value);
    storeAction({ ...data, words: wordsList.value });
    form.value.onReset();
    action();
  };

  const formAction = computed((): ActionForm => (props.module?.id ? ActionForm.Edit : ActionForm.Create));
</script>

<template>
  <v-modal :id="formId" title="Module form" @show="onShowModal">
    <template #default="{ hide }">
      <VForm :action="formAction" :config="form" @on-submit="onSubmit($event, hide)" @on-cancel="hide">
        <div class="q-pa-md">
          <div class="col">
            <FormInput v-model="form.inputs.title" />
          </div>
          <div class="row">
            <div class="col">
              <FormInput v-model="form.inputs.description" />
            </div>
          </div>
          <div class="row full-width">
            <WordsForm v-model="wordsList" />
          </div>
        </div>
      </VForm>
    </template>
  </v-modal>
</template>
