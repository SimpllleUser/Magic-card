export const getRandomizedArray = <T>(array: Array<T>): Array<T> => {
  return array.sort(() => Math.random() - 0.5);
};

export const getRandomElementFromList = <T>(array: Array<T>): T => {
  const shuffledList = array.sort(() => Math.random() - 0.5);
  return shuffledList[0];
};
