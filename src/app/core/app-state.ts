import { Injectable, signal } from '@angular/core';

export type View = 'home' | 'list' | 'chat';
export type Theme = 'light' | 'dark';

const THEME_KEY = 'lazo:tema';

@Injectable({ providedIn: 'root' })
export class AppState {
  readonly view = signal<View>('home');
  readonly selectedCatId = signal<string | null>(null);
  readonly activeScenarioId = signal<string | null>(null);
  readonly drawerOpen = signal(false);
  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  private getInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {}
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  private applyTheme(theme: Theme) {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
    html.style.colorScheme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }

  toggleTheme(theme?: Theme) {
    const next = theme ?? (this.theme() === 'dark' ? 'light' : 'dark');
    this.theme.set(next);
    this.applyTheme(next);
  }

  navigate(view: View, params: { catId?: string | null; scenarioId?: string | null } = {}) {
    this.view.set(view);
    if (params.catId !== undefined) this.selectedCatId.set(params.catId);
    this.activeScenarioId.set(params.scenarioId ?? null);
    window.scrollTo(0, 0);
    this.drawerOpen.set(false);
  }

  toggleChatbotDrawer(open: boolean) {
    this.drawerOpen.set(open);
  }
}
