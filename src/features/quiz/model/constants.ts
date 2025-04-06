import { Colors, Variants } from '@/core/models/enums';
import { QuizType } from '@/features/quiz/model/types';

export const MIN_WORDS_QUANTITY = 5;

export const ALERT_CONFIG_INSUFFICIENT_QUANTITY_WORDS = {
  title: 'Attention!',
  text: `You must choose at least ${MIN_WORDS_QUANTITY} words for play!`,
  color: Colors.Info,
  variant: Variants.Tonal
};

export const QUIZ_TYPES_OPTIONS = [
  {
    title: 'Select right word',
    value: QuizType.SelectWord
  },
  {
    title: 'Input missed letters',
    value: QuizType.InputLetters
  },
  {
    title: 'Input word',
    value: QuizType.InputWord
  }
];

export const QUIZ_RESULT_HEADER_KEYS = [
  {
    title: '#',
    key: 'number'
  },
  {
    title: 'From',
    key: 'from'
  },
  {
    title: 'To',
    key: 'to'
  },
  {
    title: 'Correct',
    key: 'isCorrect'
  },
  {
    title: 'Answer',
    key: 'answer'
  }
].map((item) => ({
  ...item,
  sortable: false
}));
