export const cutStr = (str: string, length: number) => {
  return str.length <= length ? str : str.slice(0, length).trim() + "...";
};

export const formatId = (id: string) => {
  const idLength = id.length;
  return id.slice(0, 4) + "..." + id.slice(idLength - 4, idLength);
};
