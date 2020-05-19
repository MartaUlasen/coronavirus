const numberFormatter = new Intl.NumberFormat();
export const formatNumber = (number: number) => numberFormatter.format(number);
