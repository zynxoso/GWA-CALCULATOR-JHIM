import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useStore } from '../store/useStore';

export default function PerformanceChart() {
  const { semesters } = useStore();
  
  const data = semesters.map((semester) => ({
    name: semester.name,
    gpa: semester.gpa,
  }));

  return (
    <div className="h-64 w-full bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">GPA Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 4]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="gpa"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}