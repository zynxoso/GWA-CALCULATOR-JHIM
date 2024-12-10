import React from 'react';
import { Mail, Github, Code2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export default function Footer() {
  const { settings } = useStore();
  const isDark = settings.theme.mode === 'dark';

  return (
    <footer className={`mt-12 py-12 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
            <div className="text-center space-y-4">
              <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
                <Code2 size={24} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Let's Build Something Amazing Together!</h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                I'm always interested in collaborating on exciting projects. Feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <p className="font-medium text-lg">Jan Harry I Madrona</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:xtremejeel@gmail.com"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    <Mail size={18} className="text-blue-600" />
                    <span>xtremejeel@gmail.com</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/zynxoso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    <Github size={18} className="text-blue-600" />
                    <span>github.com/zynxoso</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}