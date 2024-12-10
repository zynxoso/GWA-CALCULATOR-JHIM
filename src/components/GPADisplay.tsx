import React from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import { Semester } from '../types';
import { exportToPDF, exportToExcel } from '../utils/export';

interface GPADisplayProps {
  currentGPA: number;
  semesters: Semester[];
}

export default function GPADisplay({ currentGPA, semesters }: GPADisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Current GPA</h2>
        <p className="text-5xl font-bold text-blue-600 mt-2">{currentGPA}</p>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={() => exportToPDF(semesters)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Download size={20} />
          Export PDF
        </button>
        <button
          onClick={() => exportToExcel(semesters)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <FileSpreadsheet size={20} />
          Export Excel
        </button>
      </div>
    </div>
  );
}