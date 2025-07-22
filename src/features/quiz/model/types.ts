import { DictionaryItem } from '@/features/dictionary/model/types';
import { Nullable } from 'base-form/src/core/types/common';

export enum QuizType {
  SelectWord = 'SelectWord',
  InputLetters = 'InputLetters',
  InputWord = 'InputWord'
}


export type QuestionItem = DictionaryItem & {
  isCorrect: boolean;
  answer: Nullable<string>;
};
