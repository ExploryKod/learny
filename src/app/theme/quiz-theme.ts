import { environment } from '../../environments/environment';

const STORAGE_KEY = 'quiz-theme' as const;

function isDarkFromConfiguredDefault(): boolean {
  return environment.defaultTheme === 'dark';
}

/** Use for @Input() defaults: matches `environment.defaultTheme` (before user preference). */
export function isAppDefaultThemeDarkFromEnvironment(): boolean {
  return isDarkFromConfiguredDefault();
}

/**
 * Resolves current dark/light mode: explicit `quiz-theme` in localStorage wins;
 * if unset, uses `environment.defaultTheme`.
 */
export function isDarkModeFromQuizThemeStorage(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light') {
      return false;
    }
    if (stored === 'dark') {
      return true;
    }
    return isDarkFromConfiguredDefault();
  } catch {
    return isDarkFromConfiguredDefault();
  }
}

export function setQuizThemeBodyClass(body: HTMLElement, isDark: boolean): void {
  body.classList.toggle('quiz-theme-dark', isDark);
}

export function applyQuizThemeFromStorageToBody(): void {
  if (typeof document === 'undefined' || !document.body) {
    return;
  }
  setQuizThemeBodyClass(document.body, isDarkModeFromQuizThemeStorage());
}

export function persistQuizThemePreference(isDark: boolean): void {
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
}
