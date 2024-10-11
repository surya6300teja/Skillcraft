import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { icon: '📄', text: 'Upload your resume' },
    { icon: '📊', text: 'Get skill score' },
    { icon: '🔍', text: 'Review skill gaps' },
    { icon: '🎓', text: 'Get personalized course recommendations' }
  ];

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const response = await axios.post('http://localhost:3000/upload-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      navigate('/result', { 
        state: { 
          score: response.data.score, 
          recommended_skills: response.data.recommended_skills,
          total_possible_score: response.data.total_possible_score
        } 
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white relative overflow-x-hidden flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMTAiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDEwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>

      {/* Animated Blobs */}
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 md:top-20 md:left-20 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      />

      <motion.div 
        className="absolute bottom-10 right-10 w-24 h-24 md:bottom-20 md:right-20 md:w-32 md:h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      />

      {/* Header */}
      <header className="text-center py-6 md:py-8 relative z-10 px-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-2 font-display"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          SkillCraft
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-purple-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Analyze your resume, unlock your potential
        </motion.p>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center relative z-10 px-4 py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-stretch md:items-start md:justify-between gap-8">
          {/* How It Works Section */}
          <div className="w-full md:w-1/3 md:pr-8 flex flex-col">
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold mb-8 text-purple-200 text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            
            <div className="flex-grow flex flex-col  justify-between space-y-6 md:space-y-8">
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-4 justify-center md:justify-start group"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full w-12 h-12 flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform duration-200">
                    {step.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="text-purple-200 text-lg md:text-xl font-medium">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upload Section */}
          <motion.div 
            className="w-full md:w-2/3 max-w-2xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl p-4 md:p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Upload Your Resume</h2>
            <form onSubmit={handleSubmit}>
              <motion.div 
                {...getRootProps()} 
                className={`border-3 border-dashed rounded-2xl p-4 md:p-8 text-center cursor-pointer transition duration-300 ${
                  isDragActive ? 'border-purple-400 bg-purple-900 bg-opacity-50' : 'border-gray-400 hover:border-purple-400 hover:bg-purple-900 hover:bg-opacity-30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input {...getInputProps()} />
                {file ? (
                  <p className="text-purple-300 break-words">{file.name}</p>
                ) : isDragActive ? (
                  <p className="text-purple-300">Drop your resume here...</p>
                ) : (
                  <div>
                    <svg className="mx-auto h-10 w-10 md:h-12 md:w-12 text-purple-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-sm md:text-base">
                      Drag & drop your resume here, or click to select a file
                    </p>
                  </div>
                )}
              </motion.div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <div className="bg-purple-900 rounded-full h-2.5">
                    <motion.div 
                      className="bg-purple-400 h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                    ></motion.div>
                  </div>
                </div>
              )}

              <motion.button 
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  'Get Your Score'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;