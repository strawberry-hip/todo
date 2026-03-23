import { useState, useEffect } from 'react';
import { loadTheme, saveTheme } from '../utils/storage';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = loadTheme();
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
}
