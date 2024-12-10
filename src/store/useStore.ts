import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Semester, Settings, Todo, Subject } from '../types';
import { calculateGPA } from '../utils/calculations';

interface State {
  semesters: Semester[];
  currentSemester: Semester | null;
  settings: Settings;
  todos: Todo[];
  addSemester: (semester: Semester) => void;
  updateSemester: (id: string, semester: Partial<Semester>) => void;
  deleteSemester: (id: string) => void;
  addSubject: (subject: Subject) => void;
  deleteSubject: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      semesters: [],
      currentSemester: null,
      settings: {
        theme: { mode: 'light', primary: 'blue' },
        language: 'en',
        gradeSystem: 'gpa',
        notifications: true,
      },
      todos: [],
      addSemester: (semester) =>
        set((state) => ({ 
          semesters: [...state.semesters, semester],
          currentSemester: semester
        })),
      updateSemester: (id, updatedSemester) =>
        set((state) => ({
          semesters: state.semesters.map((sem) =>
            sem.id === id ? { ...sem, ...updatedSemester } : sem
          ),
        })),
      deleteSemester: (id) =>
        set((state) => ({
          semesters: state.semesters.filter((sem) => sem.id !== id),
        })),
      addSubject: (subject) => {
        const state = get();
        let semester = state.currentSemester;
        
        if (!semester) {
          semester = {
            id: crypto.randomUUID(),
            name: `Semester ${state.semesters.length + 1}`,
            subjects: [],
            gpa: 0,
            createdAt: new Date(),
          };
        }
        
        const updatedSubjects = [...(semester.subjects || []), subject];
        const updatedGPA = calculateGPA(updatedSubjects);
        const updatedSemester = {
          ...semester,
          subjects: updatedSubjects,
          gpa: updatedGPA,
        };
        
        set((state) => ({
          currentSemester: updatedSemester,
          semesters: state.currentSemester
            ? state.semesters.map((sem) =>
                sem.id === state.currentSemester?.id ? updatedSemester : sem
              )
            : [...state.semesters, updatedSemester],
        }));
      },
      deleteSubject: (id) =>
        set((state) => {
          if (!state.currentSemester) return state;
          
          const updatedSubjects = state.currentSemester.subjects.filter(
            (subject) => subject.id !== id
          );
          const updatedGPA = calculateGPA(updatedSubjects);
          const updatedSemester = {
            ...state.currentSemester,
            subjects: updatedSubjects,
            gpa: updatedGPA,
          };
          
          return {
            currentSemester: updatedSemester,
            semesters: state.semesters.map((sem) =>
              sem.id === state.currentSemester?.id ? updatedSemester : sem
            ),
          };
        }),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      addTodo: (todo) =>
        set((state) => ({ todos: [...state.todos, todo] })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
    }),
    {
      name: 'gpa-calculator-storage',
    }
  )
);