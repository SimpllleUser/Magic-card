import { EntityBase } from 'src/boot/types';

export interface Word {
  from: string;
  to: string;
}

export type WordEntity = EntityBase<Word>;
