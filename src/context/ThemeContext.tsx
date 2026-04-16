import { createContext, useContext, useEffect, useState } from 'react';

export interface ThemeDefinition {
  id: string;
  name: string;
  icon: string;
  isDark: boolean;
  colors: {
    brandPrimary: string;
    brandPrimaryHover: string;
    brandPrimarySubtle: string;
    brandAccent: string;
    brandAccentHover: string;
    brandAccentSubtle: string;
    surfacePrimary: string;
    surfaceSecondary: string;
    surfaceTertiary: string;
    surfaceCode: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textMuted: string;
    borderDefault: string;
    borderHover: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    shadowGlow: string;
    gradientFrom: string;
    gradientVia: string;
    gradientTo: string;
  };
}

export const themes: ThemeDefinition[] = [
  {
    id: 'parchment-light',
    name: 'Parchment',
    icon: '📜',
    isDark: false,
    colors: {
      brandPrimary: '#78716c', brandPrimaryHover: '#57534e', brandPrimarySubtle: '#f5f5f4',
      brandAccent: '#2563eb', brandAccentHover: '#1d4ed8', brandAccentSubtle: '#eff6ff',
      surfacePrimary: '#fafaf9', surfaceSecondary: '#ffffff', surfaceTertiary: '#f5f5f4', surfaceCode: '#f5f5f0',
      textPrimary: '#1c1917', textSecondary: '#44403c', textTertiary: '#78716c', textMuted: '#a8a29e',
      borderDefault: '#e7e5e4', borderHover: '#d6d3d1',
      success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6',
      shadowGlow: '0 0 40px rgba(120,113,108,0.06)',
      gradientFrom: '#78716c', gradientVia: '#57534e', gradientTo: '#2563eb',
    },
  },
  {
    id: 'slate-light',
    name: 'Paper',
    icon: '📄',
    isDark: false,
    colors: {
      brandPrimary: '#475569', brandPrimaryHover: '#334155', brandPrimarySubtle: '#f1f5f9',
      brandAccent: '#0ea5e9', brandAccentHover: '#0284c7', brandAccentSubtle: '#e0f2fe',
      surfacePrimary: '#f8fafc', surfaceSecondary: '#ffffff', surfaceTertiary: '#f1f5f9', surfaceCode: '#f1f5f9',
      textPrimary: '#0f172a', textSecondary: '#334155', textTertiary: '#64748b', textMuted: '#94a3b8',
      borderDefault: '#e2e8f0', borderHover: '#cbd5e1',
      success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6',
      shadowGlow: '0 0 40px rgba(71,85,105,0.06)',
      gradientFrom: '#475569', gradientVia: '#3b82f6', gradientTo: '#0ea5e9',
    },
  },
  {
    id: 'charcoal-dark',
    name: 'Charcoal',
    icon: '🖤',
    isDark: true,
    colors: {
      brandPrimary: '#94a3b8', brandPrimaryHover: '#cbd5e1', brandPrimarySubtle: 'rgba(148,163,184,0.1)',
      brandAccent: '#38bdf8', brandAccentHover: '#7dd3fc', brandAccentSubtle: 'rgba(56,189,248,0.1)',
      surfacePrimary: '#0f1115', surfaceSecondary: '#1a1d23', surfaceTertiary: '#24282f', surfaceCode: '#161a20',
      textPrimary: '#e2e8f0', textSecondary: '#94a3b8', textTertiary: '#64748b', textMuted: '#475569',
      borderDefault: '#2a2f38', borderHover: '#3a4050',
      success: '#34d399', warning: '#fbbf24', error: '#f87171', info: '#60a5fa',
      shadowGlow: '0 0 40px rgba(148,163,184,0.06)',
      gradientFrom: '#94a3b8', gradientVia: '#60a5fa', gradientTo: '#38bdf8',
    },
  },
];

interface ThemeContextValue {
  theme: ThemeDefinition;
  setThemeById: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function updateFavicon(bg: string, fg: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="${bg}"/><g transform="translate(3,1)"><path d="M5 8h4.2c1.4 0 2.5.4 3.2 1.1.7.7 1 1.7 1 2.8 0 .9-.2 1.7-.7 2.4-.5.6-1.2 1-2.1 1.2l3.2 5.5h-2.8l-2.8-5.1H7.7v5.1H5V8zM7.7 10v3.8h1.4c.7 0 1.3-.2 1.7-.5.4-.4.5-.8.5-1.4s-.2-1-.5-1.3c-.4-.3-.9-.5-1.7-.5H7.7z" fill="${fg}"/><path d="M18 8h2.7v10.5c0 1.2-.3 2.1-.9 2.8-.6.7-1.5 1-2.7 1-1 0-1.8-.2-2.4-.7-.6-.5-1-1.1-1.1-1.9H16c.1.3.2.5.4.6.2.2.5.2.8.2.4 0 .8-.2 1-.5.2-.3.3-.8.3-1.5V8z" fill="${fg}"/></g></svg>`;
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/svg+xml';
  link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function applyTheme(theme: ThemeDefinition) {
  const root = document.documentElement;
  const c = theme.colors;

  root.classList.toggle('dark', theme.isDark);

  // Update favicon to match theme
  updateFavicon(c.brandPrimary, theme.isDark ? '#0f1115' : '#ffffff');

  root.style.setProperty('--color-brand-primary', c.brandPrimary);
  root.style.setProperty('--color-brand-primary-hover', c.brandPrimaryHover);
  root.style.setProperty('--color-brand-primary-subtle', c.brandPrimarySubtle);
  root.style.setProperty('--color-brand-accent', c.brandAccent);
  root.style.setProperty('--color-brand-accent-hover', c.brandAccentHover);
  root.style.setProperty('--color-brand-accent-subtle', c.brandAccentSubtle);
  root.style.setProperty('--color-surface-primary', c.surfacePrimary);
  root.style.setProperty('--color-surface-secondary', c.surfaceSecondary);
  root.style.setProperty('--color-surface-tertiary', c.surfaceTertiary);
  root.style.setProperty('--color-surface-code', c.surfaceCode);
  root.style.setProperty('--color-text-primary', c.textPrimary);
  root.style.setProperty('--color-text-secondary', c.textSecondary);
  root.style.setProperty('--color-text-tertiary', c.textTertiary);
  root.style.setProperty('--color-text-muted', c.textMuted);
  root.style.setProperty('--color-border-default', c.borderDefault);
  root.style.setProperty('--color-border-hover', c.borderHover);
  root.style.setProperty('--color-success', c.success);
  root.style.setProperty('--color-warning', c.warning);
  root.style.setProperty('--color-error', c.error);
  root.style.setProperty('--color-info', c.info);
  root.style.setProperty('--shadow-glow', c.shadowGlow);

  // Update gradient utilities via CSS custom properties
  root.style.setProperty('--gradient-from', c.gradientFrom);
  root.style.setProperty('--gradient-via', c.gradientVia);
  root.style.setProperty('--gradient-to', c.gradientTo);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeDefinition>(() => {
    if (typeof window !== 'undefined') {
      const savedId = localStorage.getItem('themeId');
      const found = themes.find((t) => t.id === savedId);
      if (found) return found;
      // Default to Charcoal for dark preference, Parchment otherwise
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? themes[2] : themes[0];
    }
    return themes[0];
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('themeId', theme.id);
  }, [theme]);

  const setThemeById = (id: string) => {
    const found = themes.find((t) => t.id === id);
    if (found) setTheme(found);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeById }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
