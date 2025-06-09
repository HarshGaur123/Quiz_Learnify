// app/congratulations/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CongratulationsPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 text-white px-4">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Congratulations!</h1>
        <p className="text-lg text-gray-700 mb-6">
          You have successfully completed the quiz.
        </p>
        <button
          onClick={() => router.push('/')}
          className= " bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default CongratulationsPage;
