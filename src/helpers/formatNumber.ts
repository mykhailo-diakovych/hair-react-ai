export const formatNumber = (n: number) => {
  return new Intl.NumberFormat("en-US").format(n);
};
