import { computed, ComputedRef, Ref, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { ValidationRule } from 'src/shared/lib/use/validation';
import { ActionForm, useForm, useText } from 'src/shared/ui/VForm';
import { EntityUnform } from 'src/boot/types';
import { useModulesStore, IModule, IModuleFormConfig } from 'src/entities/Module';
import { WordEntity } from 'src/widgets/Words';

/// ADD FIX
/// EXAMPLE FOR FSD - > https://github.com/AKosogorov/fake-cyber-web-store/blob/master/src/shared/ui/VPrice/VPrice.vue
/// - Refactor by FSD VForm

interface IUseModuleAddOrUpdate {
  form: any;
  formAction: ComputedRef<ActionForm>;
  wordsList: Ref<Array<WordEntity>>;
  initDataModule: CallableFunction;
  onSubmitModule: CallableFunction;
}

export function useModuleAddOrUpdate(module: IModule): IUseModuleAddOrUpdate {
  const moduleStore = useModulesStore();
  const getFormConfig = (data?: IModule): IModuleFormConfig => {
    return {
      id: data?.id || '',
      title: useText({
        value: data?.title || '',
        label: 'Title',
        rules: [ValidationRule.Required]
      }),
      description: useText({
        value: data?.description || '',
        label: 'Description',
        rules: [ValidationRule.Required]
      })
    };
  };
  const generateForm = (params?: IModule) => useForm<IModule>(getFormConfig(params || {}));

  const form = ref(generateForm());
  const wordsList = ref<Array<WordEntity>>([]);

  const initDataModule = (module: IModule) => {
    if (!module?.id) return;
    form.value = generateForm(module || {});
    wordsList.value = cloneDeep(module.words);
  };

  const isEdit = computed(() => form.value.formValue?.id);

  const onSubmitModule = (data: EntityUnform<IModule>, action: CallableFunction) => {
    const storeAction = isEdit.value ? moduleStore.update : moduleStore.create;
    storeAction({ ...data, words: wordsList.value });
    form.value.onReset();
    action();
  };

  const formAction = computed((): ActionForm => {
    return isEdit.value ? ActionForm.Edit : ActionForm.Create;
  });

  return {
    form,
    wordsList,
    formAction,
    initDataModule,
    onSubmitModule
  };
}
