import { QuizeType } from './types';

export const QUIZE_TYPES_OPTIONS = [
  {
    title: 'Select right word',
    value: QuizeType.SelectWord
  },
  {
    title: 'Input missed letters',
    value: QuizeType.InputLetters
  },
  {
    title: 'Input word',
    value: QuizeType.InputWord
  }
];
