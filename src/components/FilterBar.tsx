import type { FilterState, FilterStatus, Priority, SortBy } from '../types/todo';

interface FilterBarProps {
  filter: FilterState;
  categories: string[];
  onChange: (patch: Partial<FilterState>) => void;
}

const STATUS_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: '全て' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了' },
];

const PRIORITY_OPTIONS: { value: Priority | 'all'; label: string }[] = [
  { value: 'all', label: '全優先度' },
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
];

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'createdAt', label: '作成日順' },
  { value: 'dueDate', label: '期限日順' },
  { value: 'priority', label: '優先度順' },
];

export function FilterBar({ filter, categories, onChange }: FilterBarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 mb-4 space-y-3">
      <input
        type="text"
        placeholder="検索..."
        value={filter.searchText}
        onChange={(e) => onChange({ searchText: e.target.value })}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-wrap gap-2">
        <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ status: opt.value })}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                filter.status === opt.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <select
          value={filter.priority}
          onChange={(e) => onChange({ priority: e.target.value as Priority | 'all' })}
          className="px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {PRIORITY_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>

        <select
          value={filter.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">全カテゴリ</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={filter.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value as SortBy })}
          className="px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
