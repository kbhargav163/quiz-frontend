"use client";

import { motion } from "framer-motion";

interface ScoreCardProps {
  score: number;
  total: number;
  onRetry: () => void;
  onResults: () => void;
}

export default function ScoreCard({ score, total, onRetry, onResults }: ScoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl text-center space-y-4"
    >
      <h2 className="text-3xl font-bold mb-4">Quiz Completed 🎉</h2>
      <p className="text-xl mb-6">
        You scored <span className="font-bold">{score}</span> out of{" "}
        <span className="font-bold">{total}</span>
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-500 transition-all"
        >
          Try Again
        </button>
        <button
          onClick={onResults}
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all"
        >
          Results
        </button>
      </div>
    </motion.div>
  );
}
