/**
 * Format a number as Polish currency (without currency symbol)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Round a number to the nearest hundred
 */
export function roundToHundred(value: number): number {
  return Math.round(value / 100) * 100;
}
