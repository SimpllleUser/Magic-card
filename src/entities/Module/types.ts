import { IInputString } from 'src/shared/ui/VForm';
import { WordEntity } from 'src/widgets/Words';

export interface IModule {
  id: string;
  title: string;
  description: string;
  words: WordEntity[];
}

export interface IModuleFormConfig {
  id: string;
  title: IInputString;
  description: IInputString;
}
