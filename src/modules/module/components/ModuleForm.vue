<script setup lang="ts">
  import { ref, toRefs, watch } from 'vue';
  import VModal from 'components/VModal.vue';
  import VForm from 'components/VForm/_index.vue';
  import { useForm } from 'src/shared/ui/VForm/useForm';
  import { ActionForm, ComponentTypes, ValidationRule } from 'components/VForm/types';
  import { useModulesStore } from 'src/modules/module/store/modules';
  import { EntityUnform } from 'boot/types';
  import { IModule } from 'src/modules/module/types';
  import { computed } from 'vue';
  import FormInput from 'components/VForm/VInput/FormInput.vue';
  import { getFormConfig, IFormConfig } from 'src/modules/module/model/form';

  interface Props {
    module?: IModule;
    formId: string;
  }

  const props = defineProps<Props>();

  const moduleStore = useModulesStore();

  const generateForm = (params?: IModule) => useForm<IModule>(getFormConfig(params || {} as IModule));

  const form = ref(generateForm());

  const { inputs } = toRefs<{ inputs: IFormConfig }>(form.value);

  const onShowModal = () => {
    if (!props.module?.id) return;
    form.value = generateForm(props.module);
  };

  const onSubmit = (data: EntityUnform<IModule>, action: CallableFunction) => {
    const storeAction = props.module?.id ? moduleStore.update : moduleStore.create;
    storeAction(data);
    form.value.onReset();
    action();
  };

  const formAction = computed((): ActionForm => (props.module?.id ? ActionForm.Edit : ActionForm.Create));
</script>

<template>
  <v-modal :id="formId" title="Module form" @show="onShowModal">
    <template #default="{ hide }">
      <VForm :action="formAction" :config="form" @on-submit="onSubmit($event, hide)" @on-cancel="hide">
        <div class="col">
          <FormInput v-model="inputs.title" />
        </div>
        <div class="row">
          <div class="col">
            <FormInput v-model="inputs.description" />
          </div>
        </div>
      </VForm>
    </template>
  </v-modal>
</template>
