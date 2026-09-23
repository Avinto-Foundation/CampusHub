export function calculatePrintCost(
  pages: number,
  copies: number,
  isColor: boolean,
): number {
  return pages * (isColor ? 10 : 2);
}
