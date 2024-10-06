import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, recommended_skills, total_possible_score } = location.state || {};
  
  const handleStartLearning = async(e) => {
    e.preventDefault();
    const skillsList = recommended_skills.map(item => item.skill);
    console.log(skillsList);
    try {
        const response = await axios.post('/api/courses', {
            list: skillsList,
        });
        navigate('/courses', { state: { courses: response.data.Courses} });
    } catch (error) {
        console.error('Error fetching courses:', error);
        alert('Error fetching courses');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwMTAiPjwvcmVjdD4KPHBhdGggZD0iTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVoiIHN0cm9rZT0iIzIwMjAyMDEwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>

      <motion.div 
        className="absolute top-20 left-20 w-20 h-20 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
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
        className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
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

      <header className="text-center py-8 relative z-10">
        <motion.h1 
          className="text-6xl font-bold mb-2 font-display"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          SkillCraft
        </motion.h1>
        <motion.p 
          className="text-2xl text-purple-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your Resume Analysis Results
        </motion.p>
      </header>

      <div className="flex-grow flex items-center justify-center relative z-10 px-4 py-8">
        <motion.div 
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-4xl w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Your Resume Score</h2>
              <p className="text-6xl font-bold text-green-400">{score}</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Total Possible Score</h2>
              <p className="text-6xl font-bold text-blue-400">{total_possible_score}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-6">Recommended Skills</h2>
            <ul className="space-y-4">
              {recommended_skills.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="bg-gray-800 bg-opacity-50 rounded-lg p-4 flex justify-between items-center"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <span className="text-lg font-medium">{item.skill}</span>
                  <span className="text-green-400 font-semibold">+{item.score_increase}%</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <motion.button 
              onClick={handleStartLearning} 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ResultPage;