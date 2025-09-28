interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
      <div
        className="bg-blue-500 h-3 transition-all"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
