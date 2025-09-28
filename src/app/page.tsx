"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md text-center space-y-6">
        <img
          src="/sre.png"
          alt="SRE"
          className="w-full  mx-auto rounded-xl shadow-md"
        />
        <h1 className="text-2xl bg-blue-500 font-bold">Welcome to the SRE Quiz</h1>
        <p className="text-green-500">
          Test your SRE knowledge with 10 challenging questions.
        </p>
        <button
          onClick={() => router.push("/quiz")}
          className="px-6 py-3 bg-rose-500 rounded-lg hover:bg-blue-500 transition-all text-white font-semibold"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
