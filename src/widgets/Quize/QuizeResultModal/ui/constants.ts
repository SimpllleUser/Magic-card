import { ResultItem } from './types';

export const MODAL = {
  ID: 'quize-result-modal',
  TITLE: 'Result of quize !'
};

export const COLUMNS = [
  {
    label: '#',
    field: 'index',
    align: 'left',
    sortable: true
  },
  {
    label: 'From',
    field: 'from',
    align: 'left',
    sortable: true
  },
  {
    label: 'To',
    field: 'to',
    align: 'left',
    sortable: true
  },
  {
    name: 'answer',
    required: true,
    label: 'Answer',
    align: 'left',
    field: (row: ResultItem) => row.answer,
    sortable: true
  }
];
