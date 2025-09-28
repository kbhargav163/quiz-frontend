"use client";

import { useState } from "react";

interface QuizCardProps {
  question: {
    id: number;
    question: string;
    options: string[];
    answer: string;
  };
  onAnswer: (selected: string) => void;
  onSkip: () => void;
}

export default function QuizCard({ question, onAnswer, onSkip }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (option: string) => {
    setSelected(option);
    setTimeout(() => {
      onAnswer(option);
      setSelected(null);
    }, 1000);
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg text-center transition-all">
      <h2 className="text-2xl font-semibold mb-4">{question.question}</h2>
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={`p-3 rounded-xl border transition-all ${
              selected === option
                ? option === question.answer
                  ? "bg-green-600 border-green-400"
                  : "bg-red-600 border-red-400"
                : "bg-gray-700 hover:bg-gray-600 border-gray-500"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={onSkip}
        className="mt-6 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all"
      >
        Skip
      </button>
    </div>
  );
}
