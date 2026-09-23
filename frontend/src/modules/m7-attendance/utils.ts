export function isEligibleForExam(attended: number, total: number): boolean {
  if (total === 0) {
    return false;
  }
  return Math.round((attended / total) * 100) >= 75;
}
