import { ref } from "vue";
import {IModule} from "src/features/Module/types/module";
import {cloneDeep} from "lodash";
import {useForm} from "src/shared/ui/VForm/useForm";
import {getFormConfig} from "src/features/Module/types/form";
import {WordEntity} from "src/features/words/types/word";
import {EntityUnform} from "boot/types";

/// ADD FIX
/// - Refactor by FSD VForm
/// - Fix es lint problem

interface IUseModuleAddOrUpdate {
  initDataModule: CallableFunction
  onSubmitModule: CallableFunction
}

export function useModuleAddOrUpdate(module: IModule):  {

  const generateForm = (params?: IModule) => useForm(getFormConfig(params || {}));

  const form = ref(generateForm());
  const wordsList = ref<Array<WordEntity>>([]);

  const initDataModule = (module: IModule) => {
    if (!module?.id) return;
    form.value = generateForm(module || {});
    wordsList.value = cloneDeep(module.words);
  }

  const onSubmitModule = (data: EntityUnform<IModule>, action: CallableFunction) => {
    const storeAction = module?.id ? moduleStore.update : moduleStore.create;
    storeAction({ ...data, words: wordsList.value });
    form.value.onReset();
    action();
  }

  return {
    initDataModule,
    onSubmitModule,
  }
}
