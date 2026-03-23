export type Priority = 'high' | 'medium' | 'low';
export type FilterStatus = 'all' | 'active' | 'completed';
export type SortBy = 'createdAt' | 'dueDate' | 'priority';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string; // ISO date string YYYY-MM-DD
  category: string;
  createdAt: string;
}

export interface FilterState {
  status: FilterStatus;
  priority: Priority | 'all';
  category: string;
  searchText: string;
  sortBy: SortBy;
}
