import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { settings, updateSettings } = useStore();
  const isDark = settings.theme.mode === 'dark';

  const toggleTheme = () => {
    updateSettings({
      theme: {
        ...settings.theme,
        mode: isDark ? 'light' : 'dark',
      },
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        isDark ? 'bg-gray-800 text-yellow-400' : 'bg-blue-100 text-blue-600'
      }`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}