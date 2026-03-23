import { useState, useMemo, useCallback } from 'react';
import type { Todo, Priority, FilterState, SortBy } from '../types/todo';
import { loadTodos, saveTodos } from '../utils/storage';

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const DEFAULT_FILTER: FilterState = {
  status: 'all',
  priority: 'all',
  category: 'all',
  searchText: '',
  sortBy: 'createdAt',
};

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  const persist = useCallback((updated: Todo[]) => {
    setTodos(updated);
    saveTodos(updated);
  }, []);

  const addTodo = useCallback(
    (data: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => {
      const newTodo: Todo = {
        ...data,
        id: generateId(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      persist([newTodo, ...todos]);
    },
    [todos, persist]
  );

  const updateTodo = useCallback(
    (id: string, changes: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
      persist(todos.map((t) => (t.id === id ? { ...t, ...changes } : t)));
    },
    [todos, persist]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      persist(todos.filter((t) => t.id !== id));
    },
    [todos, persist]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      persist(
        todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    },
    [todos, persist]
  );

  const categories = useMemo(() => {
    const set = new Set(todos.map((t) => t.category).filter(Boolean));
    return Array.from(set).sort();
  }, [todos]);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (filter.status === 'active') result = result.filter((t) => !t.completed);
    else if (filter.status === 'completed') result = result.filter((t) => t.completed);

    if (filter.priority !== 'all') result = result.filter((t) => t.priority === filter.priority);

    if (filter.category !== 'all') result = result.filter((t) => t.category === filter.category);

    if (filter.searchText.trim()) {
      const q = filter.searchText.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      switch (filter.sortBy as SortBy) {
        case 'priority':
          return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        case 'dueDate': {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        }
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    return { total, completed, active: total - completed };
  }, [todos]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    categories,
    stats,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
}
