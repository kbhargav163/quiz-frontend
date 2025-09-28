import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Quiz App",
  description: "Minimal quiz app with animations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-6 py-4 bg-black/30 backdrop-blur-md shadow-lg">
          <h1 className="text-2xl font-bold">QuizHub</h1>
          <div className="space-x-4">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/quiz" className="hover:text-blue-400">Quiz</Link>
          </div>
        </nav>
        <main className="flex-1 flex items-center justify-center px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
