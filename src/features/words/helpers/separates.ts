export const separateByString = (text: string, separator: string): string[] => {
  return text.split(separator);
};

export const joinSeparatedValue = (
  separatedValue: string[][],
  {
    separatorDefinition,
    separatorWordItems
  }: {
    separatorDefinition: string;
    separatorWordItems: string;
  }
): string => {
  return separatedValue.map((item: string[]) => item.join(separatorDefinition)).join(separatorWordItems);
};
