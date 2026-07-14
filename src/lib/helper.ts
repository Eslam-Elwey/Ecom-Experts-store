export function calcDiscount(
  originalPrice: number,
  currentPrice: number,
): number {
  return Math.floor(((originalPrice - currentPrice) * 100) / originalPrice);
}
