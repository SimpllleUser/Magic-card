import { WordEntity } from 'src/features/words/types/word';
import { IInputString } from 'src/shared/ui/VForm';

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
