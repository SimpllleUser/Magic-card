export const mapObject = (objectItem: any, callback: any) =>
  Object.fromEntries(Object.entries(objectItem).map(callback));

const mapFormInput = (input: any) => {
  if (!Object.keys(input).includes('value')) return input;
  return {
    ...input,
    _rules: input.rules
  };
};

const mapLayerInputForm = (formLayer: any) =>
  mapObject(formLayer, ([key, value]: [string, any]) => {
    if (key === 'id') return [key, value];
    return [key, mapFormInput(value)];
  });

export const mapForm = (formItem: any) => {
  const actualForm = formItem;

  if (Array.isArray(actualForm.value)) {
    actualForm.value = actualForm.value.map(mapLayerInputForm);
    return actualForm;
  }
  return mapFormInput(actualForm);
};

// const res = _.mapValues(data, mapForm)
