import { WordEntity } from 'src/features/words/types/word';

// export interface IWordCard {
//   id: string;
//   from: string;
//   to: string;
// }

export interface IModule {
  id: string;
  title: string;
  description: string;
  words: WordEntity[];
}
