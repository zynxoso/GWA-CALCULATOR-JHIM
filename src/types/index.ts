export interface Subject {
  id: string;
  name: string;
  grade: number;
  credits: number;
  gradeType: 'percentage' | 'letter' | 'gpa';
}

export interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
  gpa: number;
  createdAt: Date;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
}

export interface Theme {
  mode: 'light' | 'dark';
  primary: string;
}

export interface Settings {
  theme: Theme;
  language: string;
  gradeSystem: 'percentage' | 'letter' | 'gpa';
  notifications: boolean;
}