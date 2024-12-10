export const letterToGPA: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
};

export const percentageToGPA = (percentage: number): number => {
  if (percentage >= 93) return 4.0;
  if (percentage >= 90) return 3.7;
  if (percentage >= 87) return 3.3;
  if (percentage >= 83) return 3.0;
  if (percentage >= 80) return 2.7;
  if (percentage >= 77) return 2.3;
  if (percentage >= 73) return 2.0;
  if (percentage >= 70) return 1.7;
  if (percentage >= 67) return 1.3;
  if (percentage >= 63) return 1.0;
  return 0.0;
};

export const convertGrade = (
  value: number | string,
  from: 'percentage' | 'letter' | 'gpa',
  to: 'percentage' | 'letter' | 'gpa'
): number => {
  if (from === to) return typeof value === 'string' ? letterToGPA[value] : value;
  
  if (from === 'percentage' && to === 'gpa') {
    return percentageToGPA(Number(value));
  }
  
  if (from === 'letter' && to === 'gpa') {
    return letterToGPA[value as string];
  }
  
  return Number(value);
};