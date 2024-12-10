import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Subject } from '../types';

export default function SubjectForm() {
  const { addSubject, settings } = useStore();
  const isDark = settings.theme.mode === 'dark';
  const [subject, setSubject] = useState({
    name: '',
    grade: '',
    credits: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.name && subject.grade && subject.credits) {
      const newSubject: Subject = {
        id: crypto.randomUUID(),
        name: subject.name,
        grade: Number(subject.grade),
        credits: Number(subject.credits),
        gradeType: 'gpa',
      };
      addSubject(newSubject);
      setSubject({ name: '', grade: '', credits: '' });
    }
  };

  const inputClassName = `rounded-lg border p-2 w-full ${
    isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Subject Name"
          value={subject.name}
          onChange={(e) => setSubject({ ...subject, name: e.target.value })}
          className={inputClassName}
          required
        />
        <input
          type="number"
          placeholder="Grade (0-4)"
          value={subject.grade}
          onChange={(e) => setSubject({ ...subject, grade: e.target.value })}
          className={inputClassName}
          step="0.1"
          min="0"
          max="4"
          required
        />
        <input
          type="number"
          placeholder="Credits"
          value={subject.credits}
          onChange={(e) => setSubject({ ...subject, credits: e.target.value })}
          className={inputClassName}
          min="0"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg p-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
      >
        <PlusCircle size={20} />
        Add Subject
      </button>
    </form>
  );
}