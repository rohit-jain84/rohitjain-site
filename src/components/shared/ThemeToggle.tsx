import { useState, useRef, useEffect } from 'react';
import { useTheme, themes } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { theme, setThemeById } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full border border-border-default bg-surface-secondary flex items-center justify-center hover:border-brand-primary transition-all duration-150 hover:scale-110 text-base"
        aria-label="Change theme"
        title={theme.name}
      >
        {theme.icon}
      </button>

      {/* Theme picker dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 bg-surface-secondary border border-border-default rounded-xl shadow-lg p-2 min-w-[200px] animate-in fade-in">
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted px-2 py-1.5 mb-1">Theme</p>
          <div className="space-y-0.5">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => { setThemeById(t.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                  theme.id === t.id
                    ? 'bg-brand-primary-subtle text-brand-primary font-semibold'
                    : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
                }`}
              >
                <span className="text-base w-6 text-center">{t.icon}</span>
                <span className="flex-1 text-left">{t.name}</span>
                {/* Color preview dots */}
                <span className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.colors.brandPrimary }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.colors.brandAccent }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.colors.surfacePrimary, border: '1px solid ' + t.colors.borderDefault }} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
