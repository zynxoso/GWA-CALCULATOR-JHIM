export const calculateGPA = (subjects: { grade: number; credits: number }[]): number => {
  if (subjects.length === 0) return 0;

  const totalWeightedGrade = subjects.reduce(
    (sum, subject) => sum + subject.grade * subject.credits,
    0
  );
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);

  return totalCredits === 0 ? 0 : Number((totalWeightedGrade / totalCredits).toFixed(2));
};