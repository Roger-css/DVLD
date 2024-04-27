// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (FilterMode: any) => {
  const arrOfFilters = [];
  for (const key in FilterMode) {
    arrOfFilters.push(FilterMode[key]);
  }
  return arrOfFilters;
};
