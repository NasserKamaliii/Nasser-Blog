export const splitStringToArray = (input: string, delimiter: string = ","): Set<string> => {
  return new Set(input.split(delimiter).map(item => item.trim()).filter(item => item.length > 0));
};