import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { practicals } from './data';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./App.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
const codeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

function App() {
  const [selectedPracticalId, setSelectedPracticalId] = useState(practicals[0].id);
  const [selectedLanguage, setSelectedLanguage] = useState(
    Object.keys(practicals[0].implementations)[0]
  );
 
  
  const [isCopied, setIsCopied] = useState(false);

  const selectedPractical = practicals.find(p => p.id === selectedPracticalId);

  const handleSelectPractical = (id) => {
    setSelectedPracticalId(id);
    const newPractical = practicals.find(p => p.id === id);
    setSelectedLanguage(Object.keys(newPractical.implementations)[0]);
  };

  const handleCopy = () => {
    const codeToCopy = selectedPractical.implementations[selectedLanguage].trim();
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); 
    });
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
        <motion.div className="bg-[#161B22] border border-gray-700 rounded-lg shadow-2xl overflow-hidden relative" 
          variants={itemVariants}
          layout>

        </motion.div >
        
          <div className="bg-[#0D1117] p-3 flex justify-between items-center gap-2 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-500 text-sm hidden sm:block">
              {selectedPractical.title} - Explaination Video
            </div>
            
          </div>
          <div dangerouslySetInnerHTML={{ __html: selectedPractical.Explaination_video_url }} className="p-2 flex justify-center space-x-2 bg-[#161B22]/50 backdrop-blur-sm">
            
          </div>
         
        
        <motion.div 
          className="bg-[#161B22] border border-gray-700 rounded-lg shadow-2xl overflow-hidden relative" 
          variants={itemVariants}
          layout
        >
          <div className="bg-[#0D1117] p-3 flex justify-between items-center gap-2 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-500 text-sm hidden sm:block">
              {selectedPractical.title} - {selectedLanguage}
            </div>
            <motion.button
              onClick={handleCopy}
              className={`px-3 py-1 text-xs rounded-md flex items-center gap-2 transition-colors ${
                isCopied 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isCopied}
            >
              {isCopied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  Copy
                </>
              )}
            </motion.button>
          </div>
          <div className="p-2 flex space-x-2 bg-[#161B22]/50 backdrop-blur-sm">
            {Object.keys(selectedPractical.implementations).map((lang) => (
              <motion.button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                  selectedLanguage === lang ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedLanguage === lang && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/20 rounded-lg"
                    layoutId="activeLang"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{lang}</span>
              </motion.button>
            ))}
          </div>
          <div className="text-left max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPracticalId + selectedLanguage}
                variants={codeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                <SyntaxHighlighter
                  language={selectedLanguage}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    backgroundColor: 'transparent',
                  }}
                  codeTagProps={{ style: { fontFamily: '"Fira Code", monospace' } }}
                  showLineNumbers={true}
                  wrapLines={true}
                >
                  {selectedPractical.implementations[selectedLanguage].trim()}
                </SyntaxHighlighter>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;