// // app/congratulations/page.tsx

// 'use client';

// import React from 'react';
// import { useRouter } from 'next/navigation';

// const CongratulationsPage: React.FC = () => {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 text-white px-4">
//       <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full">
//         <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Congratulations!</h1>
//         <p className="text-lg text-gray-700 mb-6">
//           You have successfully completed the quiz.
//         </p>
//         <button
//           onClick={() => router.push('/')}
//           className= " bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition"
//         >
//           Go to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CongratulationsPage;


"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import Confetti to avoid SSR issues
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function ThankYouPage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-12">
      {/* Confetti Effect */}
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={200} />}

      {/* Celebration Image */}
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
       transition={{ duration: 0.8, ease: "easeOut" }}>
        
      </motion.div>

      {/* Thank You Message */}
      <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.8, delay: 0.2 }} 
      className="text-3xl sm:text-4xl md:text-5xl font-bold mt-6 text-center">
        🎉 Thank You for Your Submission! 🎉
      </motion.h1>

      {/* Motivational Quote */}
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      transition={{ duration: 1, delay: 0.5 }}
       className="text-lg sm:text-xl italic text-center max-w-lg mt-4 px-4">
        "Your dedication to learning is your greatest asset. Keep striving for excellence!"
      </motion.p>

      {/* Home Button */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => router.push("/")} 
      className="mt-6 bg-white text-purple-600 hover:bg-purple-100 font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-lg text-lg transition">
        Go to Homepage
      </motion.button>
    </div>
  );
}

