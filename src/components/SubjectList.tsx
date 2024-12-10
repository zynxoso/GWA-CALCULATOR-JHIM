import React from 'react';
import { Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Subject } from '../types';

export default function SubjectList() {
  const { currentSemester, deleteSubject, settings } = useStore();
  const isDark = settings.theme.mode === 'dark';

  return (
    <div className="space-y-4">
      {currentSemester?.subjects.map((subject: Subject) => (
        <div
          key={subject.id}
          className={`p-4 rounded-lg shadow-sm flex items-center justify-between ${
            isDark ? 'bg-gray-700' : 'bg-white'
          }`}
        >
          <div>
            <h3 className="font-medium">{subject.name}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Grade: {subject.grade} | Credits: {subject.credits}
            </p>
          </div>
          <button
            onClick={() => deleteSubject(subject.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      {(!currentSemester?.subjects || currentSemester.subjects.length === 0) && (
        <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          No subjects added yet
        </p>
      )}
    </div>
  );
}