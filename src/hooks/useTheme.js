import { useLayoutEffect, useSyncExternalStore } from 'react';

let currentTheme;
const themeEvent = 'portfolio-theme-change';
function readSavedTheme() {
  try { return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'; }
  catch { return 'dark'; }
}
function getSnapshot() { return currentTheme ??= readSavedTheme(); }
function subscribe(callback) {
  const changed = event => {
    if (event.type === 'storage' && event.key !== 'theme') return;
    if (event.type === 'storage') currentTheme = readSavedTheme();
    callback();
  };
  window.addEventListener(themeEvent, changed);
  window.addEventListener('storage', changed);
  return () => {
    window.removeEventListener(themeEvent, changed);
    window.removeEventListener('storage', changed);
  };
}
function toggleTheme() {
  currentTheme = getSnapshot() === 'dark' ? 'light' : 'dark';
  document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  try { localStorage.setItem('theme', currentTheme); } catch { /* Keep the theme for this session. */ }
  window.dispatchEvent(new Event(themeEvent));
}

// Both portfolio modes use the same preference, including changes from another tab.
export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'dark');
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return { theme, toggleTheme };
}
