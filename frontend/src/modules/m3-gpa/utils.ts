export function calculateGPA(
  courses: { gradePoint: number; credits: number }[],
): number {
  if (courses.length === 0) {
    return 0;
  }
  const total = courses.reduce((sum, course) => sum + course.gradePoint, 0);
  return total / courses.length;
}
