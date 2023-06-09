export function formattedAmount(amount: number): string {
  const amountStr = String(amount);

  return amountStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
