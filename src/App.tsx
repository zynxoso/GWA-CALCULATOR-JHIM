import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import SubjectForm from './components/SubjectForm';
import SubjectList from './components/SubjectList';
import GPADisplay from './components/GPADisplay';
import ThemeToggle from './components/ThemeToggle';
import PerformanceChart from './components/PerformanceChart';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { useStore } from './store/useStore';

function App() {
  const { settings, currentSemester } = useStore();
  const isDark = settings.theme.mode === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 relative">
          <div className="absolute right-4 top-0">
            <ThemeToggle />
          </div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <GraduationCap size={40} className="text-blue-600" />
            <h1 className="text-4xl font-bold">GPA Calculator</h1>
          </motion.div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your academic performance with ease
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`${
                isDark ? 'bg-gray-800' : 'bg-white'
              } p-6 rounded-lg shadow-lg`}
            >
              <h2 className="text-2xl font-semibold mb-6">Add New Subject</h2>
              <SubjectForm />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`${
                isDark ? 'bg-gray-800' : 'bg-white'
              } p-6 rounded-lg shadow-lg`}
            >
              <h2 className="text-2xl font-semibold mb-6">Current Subjects</h2>
              <SubjectList />
            </motion.div>

            <PerformanceChart />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <GPADisplay
                currentGPA={currentSemester?.gpa || 0}
                semesters={[currentSemester].filter(Boolean)}
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <TodoList />
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;