export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  minimumFractionDigits: number = 0
): string => {
  const value = amount / 100;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits,
  }).format(value);
};
