export function calculateGPA(gradePoints: number[]): number {
  if (gradePoints.length === 0) {
    return 0;
  }
  let total = 0;
  for (const gradePoint of gradePoints) {
    total = total + gradePoint;
  }
  return total / 4;
}
