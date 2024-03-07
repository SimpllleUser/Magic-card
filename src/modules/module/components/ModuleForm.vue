<script setup lang="ts">
  import VModal from 'components/VModal.vue';
  import VInput from 'components/VForm/VInput/VInput.vue';
  // import input from 'components/VForm/VInput/VInput.vue';
  import VForm from 'components/VForm/_index.vue';

  import { useForm } from 'components/VForm/composables/useForm';
  import { ActionForm, ValidationRule } from 'components/VForm/types';
  import { useModulesStore } from 'src/modules/module/store/modules';
  import { EntityUnform } from 'boot/types';
  import { IModule } from 'src/modules/module/types';
  import { computed } from 'vue';
  import FormInput from 'components/VForm/VInput/FormInput.vue';
  import { useCheckbox, useFormInputList, useInput } from 'components/VForm/VInput/form-inputs';
  // import FormInputList from 'components/VForm/VInput/FormInputList.vue';

  interface Props {
    module?: IModule;
    formId: string;
  }

  const props = defineProps<Props>();

  const moduleStore = useModulesStore();

  const formInputItem = {
    name: useInput({
      value: '',
      label: 'Name',
      rules: [ValidationRule.Required]
    }),
    isChecked: useCheckbox({
      value: '',
      label: 'Checked',
      rules: [ValidationRule.Required]
    })
  };

  console.log(useFormInputList(new Array(3).fill(formInputItem)));
  const formItemsLIst = [];

  const formConfig = {
    title: useInput({
      value: '',
      label: 'Title',
      rules: [ValidationRule.Required]
    }),
    description: useInput({
      value: '',
      label: 'Description',
      rules: [ValidationRule.Required],
      type: 'textarea'
    }),
    items: useFormInputList(new Array(3).fill(formInputItem))
    // titleFrom: {
    //   value: '',
    //   label: 'From',
    //   rules: [ValidationRule.Required]
    // },
    // titleTo: {
    //   value: '',
    //   label: 'To',
    //   rules: [ValidationRule.Required]
    // }
    // items: [
    //   {
    //     value: 'Word - 1',
    //     label: 'Word - 1',
    //     rules: [ValidationRule.Required]
    //   },
    //   {
    //     value: 'Word - 2',
    //     label: 'Word - 2',
    //     rules: [ValidationRule.Required]
    //   },
    //   {
    //     value: 'Word - 3',
    //     label: 'Word - 3',
    //     rules: [ValidationRule.Required]
    //   }
    // ]
  };
  /// ?CREATE TYPE ITEM FOR INIT OF PROPERTY ITEM FORM

  const form = useForm({ ...formConfig });
  const { formData, testFormData } = form;

  const onShowModal = () => {
    if (!props.module?.id) return;
    form.updateInputValue(props.module);
  };

  const onSubmit = (data: EntityUnform<IModule>, action: CallableFunction) => {
    const storeAction = props.module?.id ? moduleStore.update : moduleStore.create;
    storeAction(data);
    form.onReset();
    action();
  };

  const formAction = computed((): ActionForm => (props.module?.id ? ActionForm.Edit : ActionForm.Create));
</script>

<template>
  <v-modal :id="formId" title="Module form" @show="onShowModal">
    <template #default="{ hide }">
      <!--      <FormInputList v-model="formItemsLIst" :config="formInputItem" />-->
      <VForm :action="formAction" :config="form" @on-submit="onSubmit($event, hide)" @on-cancel="hide">
        <div class="row">
          <div class="col">
            <FormInput v-model="formData.title" />
          </div>
          <div class="col">
            <FormInput v-model="formData.description" />
          </div>
        </div>
        <div class="row">
          <FormInput v-model="formData.items" />
        </div>
        <!--        <div class="row">-->
        <!--          <div class="col">-->
        <!--            <VInput v-model="formData.titleFrom" hint="12312" />-->
        <!--          </div>-->
        <!--          <div class="col">-->
        <!--            <VInput v-model="formData.titleTo" />-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div>-->
        <!--          <h3>Words</h3>-->
        <!--          <div>-->
        <!--            <VInput v-for="(item, index) in formData.items" :key="item.label" v-model="formData.items[index]" />-->
        <!--          </div>-->
        <!--        </div>-->
      </VForm>
    </template>
  </v-modal>
</template>

<style scoped></style>
