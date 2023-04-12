export const cutStr = (str: string, length: number) => {
  return str.length <= length ? str : str.slice(0, length).trim() + "...";
};
