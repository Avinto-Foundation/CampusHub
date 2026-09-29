export function isEligibleForExam(attended: number, total: number): boolean {
  if (total === 0) {
    return false;
  }
  const percentage = (attended / total) * 100;
  return percentage >= 70;
}
