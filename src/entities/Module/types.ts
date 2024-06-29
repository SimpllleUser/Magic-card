import { WordEntity } from 'src/features/words/types/word';

export interface IModule {
  id: string;
  title: string;
  description: string;
  words: WordEntity[];
}
