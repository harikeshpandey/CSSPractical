import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

function CodeBlock({ practical }) {
  const [selectedLanguage, setSelectedLanguage] = useState(
    Object.keys(practical.implementations)[0]
  );
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setSelectedLanguage(Object.keys(practical.implementations)[0]);
  }, [practical]);

  const handleCopy = () => {
    const codeToCopy = practical.implementations[selectedLanguage].trim();
    const textArea = document.createElement('textarea');
    textArea.value = codeToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <motion.div 
      className="bg-[#161B22] border border-gray-700 rounded-lg shadow-2xl overflow-hidden relative" 
      layout
    >
      <div className="bg-[#0D1117] p-3 flex justify-between items-center gap-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-500 text-sm hidden sm:block">
            {practical.title} - {selectedLanguage}
        </div>
        <motion.button
          onClick={handleCopy}
          disabled={isCopied}
          className={`px-3 py-1 text-xs rounded-md flex items-center gap-2 transition-colors ${
            isCopied 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        {Object.keys(practical.implementations).map((lang) => (
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
            key={practical.id + selectedLanguage}
            variants={codeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <SyntaxHighlighter
              language={selectedLanguage}
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                backgroundColor: 'transparent',
              }}
              codeTagProps={{ style: { fontFamily: '"Fira Code", monospace' } }}
              showLineNumbers={true}
              wrapLines={true}
            >
              {practical.implementations[selectedLanguage].trim()}
            </SyntaxHighlighter>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default CodeBlock;
