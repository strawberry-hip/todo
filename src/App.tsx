import { useTheme } from './hooks/useTheme';
import { useTodos } from './hooks/useTodos';
import { Header } from './components/Header';
import { AddTodoForm } from './components/AddTodoForm';
import { FilterBar } from './components/FilterBar';
import { StatsBar } from './components/StatsBar';
import { TodoList } from './components/TodoList';

export default function App() {
  const { isDark, toggle } = useTheme();
  const {
    todos,
    filter,
    setFilter,
    categories,
    stats,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Header isDark={isDark} onToggleTheme={toggle} />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <AddTodoForm categories={categories} onAdd={addTodo} />
        <StatsBar {...stats} />
        <FilterBar
          filter={filter}
          categories={categories}
          onChange={(patch) => setFilter((prev) => ({ ...prev, ...patch }))}
        />
        <TodoList
          todos={todos}
          categories={categories}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </main>
    </div>
  );
}
