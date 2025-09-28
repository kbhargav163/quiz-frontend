"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface UserAnswer {
  id: number;
  question: string;
  selected: string;
  answer: string;
  correct: boolean;
}

export default function ResultsPage() {
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("latestAnswers");
    if (data) setAnswers(JSON.parse(data));
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Quiz Results</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Q. No</th>
            <th className="border-b p-2">Question</th>
            <th className="border-b p-2">Your Answer</th>
            <th className="border-b p-2">Correct Answer</th>
            <th className="border-b p-2">Result</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((ans, idx) => (
            <tr key={ans.id} className="border-b">
              <td className="p-2">{idx + 1}</td>
              <td className="p-2">{ans.question}</td>
              <td className="p-2">{ans.selected}</td>
              <td className="p-2">{ans.answer}</td>
              <td className="p-2">
                {ans.correct ? (
                  <span className="text-green-500 font-bold">✔️</span>
                ) : (
                  <span className="text-red-500 font-bold">❌</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-center">
        <Link href="/" className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all">
          Go Home
        </Link>
      </div>
    </div>
  );
}
