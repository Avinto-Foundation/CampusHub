export function calculatePrintCost(
  pages: number,
  copies: number,
  isColor: boolean,
): number {
  let pricePerPage = 2;
  if (isColor) {
    pricePerPage = 10;
  }
  return pages * pricePerPage;
}
