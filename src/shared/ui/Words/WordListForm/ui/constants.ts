export const COLUMNS = [
  { name: 'number', label: '#', align: 'left', field: 'number' },
  { name: 'from', label: 'From', align: 'left', field: 'from' },
  { name: 'to', label: 'To', align: 'left', field: 'to' },
  { name: 'actions', label: 'Actions', align: 'right', field: 'action' }
];

export const TABLE_CONFIG = {
  columns: COLUMNS,
  rowKey: 'name',
  separator: 'horizontal',
  flat: true,
  bordered: true,
  noDataLabel: 'Empty list of words',
  noResultsLabel: 'Not find of words'
};
