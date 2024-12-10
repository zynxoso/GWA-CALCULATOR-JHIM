import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo, settings } = useStore();
  const [newTodo, setNewTodo] = useState('');
  const isDark = settings.theme.mode === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo({
        id: crypto.randomUUID(),
        title: newTodo,
        completed: false,
      });
      setNewTodo('');
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
      <h2 className="text-2xl font-semibold mb-4">Academic Goals</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new goal..."
          className={`flex-1 rounded-lg border p-2 ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center justify-between p-2 hover:bg-opacity-50 rounded-lg ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={todo.completed ? 'text-green-500' : 'text-gray-500'}
              >
                {todo.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </button>
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}