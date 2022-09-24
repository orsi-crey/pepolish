export const sortAndUniqList = (list: string[]) => {
  return list.sort().filter((item, pos, ary) => {
    return !pos || item != ary[pos - 1];
  });
};
