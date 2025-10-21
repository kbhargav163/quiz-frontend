"use client";

import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import ProgressBar from "../components/ProgressBar";
import ScoreCard from "../components/ScoreCard";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface UserAnswer {
  id: number;
  question: string;
  selected: string;
  answer: string;
  correct: boolean;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[] | null>(null); // null initially
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const router = useRouter();

  useEffect(() => {
    setQuestions(null); 
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setAnswers([]);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz`)
    .then((res) => res.json())
    .then((data) => setQuestions(data))
    .catch((err) => {
      console.error("Failed to fetch quiz:", err);
      setQuestions([]); 
    });
}, []);
  const handleAnswer = (selected: string) => {
    if (!questions) return;

    const question = questions[currentIndex];
    const correct = question.answer === selected;

    setAnswers((prev) => [
      ...prev,
      { id: question.id, question: question.question, selected, answer: question.answer, correct },
    ]);

    if (correct) setScore((prev) => prev + 1);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleSkip = () => {
    if (!questions) return;

    const question = questions[currentIndex];
    setAnswers((prev) => [
      ...prev,
      { id: question.id, question: question.question, selected: "Skipped", answer: question.answer, correct: false },
    ]);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleResults = () => {
    localStorage.setItem("latestAnswers", JSON.stringify(answers));
    router.push("/results");
  };

  
  if (!questions) return <div className="text-center mt-10 text-xl">Loading quiz...</div>;

  if (finished) {
    return (
      <ScoreCard
        score={score}
        total={questions.length}
        onRetry={() => {
          setCurrentIndex(0);
          setScore(0);
          setFinished(false);
          setAnswers([]);
        }}
        onResults={handleResults}
      />
    );
  }

  return (
    <div className="w-full max-w-xl space-y-6 mx-auto mt-10">
      <ProgressBar current={currentIndex + 1} total={questions.length} />
      <QuizCard question={questions[currentIndex]} onAnswer={handleAnswer} onSkip={handleSkip} />
    </div>
  );
}
