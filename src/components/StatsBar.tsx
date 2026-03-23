interface StatsBarProps {
  total: number;
  completed: number;
  active: number;
}

export function StatsBar({ total, completed, active }: StatsBarProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 mb-4">
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span>全体: <strong className="text-gray-700 dark:text-gray-200">{total}</strong></span>
        <span>未完了: <strong className="text-blue-600 dark:text-blue-400">{active}</strong></span>
        <span>完了: <strong className="text-green-600 dark:text-green-400">{completed}</strong></span>
        <span className="font-medium text-gray-700 dark:text-gray-200">{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
