
export const formatCurrency = (
  amount: number, 
  currency: string = 'EUR', 
  locale: string = 'es-ES'
) => {
  return new Intl.NumberFormat(locale, { 
    style: 'currency', 
    currency 
  }).format(amount);
};
