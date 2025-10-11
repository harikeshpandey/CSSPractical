import { useState } from 'react';
import { motion } from 'framer-motion';
import { practicals } from './data';
import "./App.css";

import VideoPlayer from './components/VideoPlayer'; 
import CodeBlock from './components/CodeBlock';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

function App() {
  const [selectedPracticalId, setSelectedPracticalId] = useState(practicals[0].id);
  const selectedPractical = practicals.find(p => p.id === selectedPracticalId);

  const handleSelectPractical = (id) => {
    setSelectedPracticalId(id);
  };

  return (
    <div className="bg-[#0D1117] text-gray-300 min-h-screen font-mono p-4 sm:p-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold mb-2 text-blue-400 tracking-wider"
          variants={itemVariants}
        >
          Computer System Security Lab
        </motion.h1>
        <motion.p className="text-gray-500 mb-8" variants={itemVariants}>
          Select a practical to view its implementation.
        </motion.p>
        
        <motion.div className="mb-8" variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4 text-gray-400">Practicals</h2>
          <motion.div 
            className="flex flex-wrap gap-3"
            variants={containerVariants}
          >
            {practicals.map((practical) => (
              <motion.button
                key={practical.id}
                onClick={() => handleSelectPractical(practical.id)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base ${
                  selectedPractical.id === practical.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-[#161B22] border border-gray-700 hover:bg-gray-800 hover:text-white'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {practical.title}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          {selectedPractical && <VideoPlayer practical={selectedPractical} />}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          {selectedPractical && <CodeBlock practical={selectedPractical} />}
        </motion.div>

      </motion.div>
    </div>
  );
}

export default App;