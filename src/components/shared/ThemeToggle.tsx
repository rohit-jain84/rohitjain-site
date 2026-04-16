import { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme, themes } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { theme, setThemeById } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = themes.findIndex((t) => t.id === theme.id);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, close]);

  // Keyboard navigation inside dropdown
  function handleDropdownKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const focused = optionRefs.current.findIndex((el) => el === document.activeElement);
      let next: number;
      if (e.key === 'ArrowDown') {
        next = focused < themes.length - 1 ? focused + 1 : 0;
      } else {
        next = focused > 0 ? focused - 1 : themes.length - 1;
      }
      optionRefs.current[next]?.focus();
    }
  }

  function handleOpen() {
    setIsOpen(true);
    // Focus the active option after dropdown renders
    requestAnimationFrame(() => {
      optionRefs.current[activeIndex]?.focus();
    });
  }

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        onClick={() => isOpen ? close() : handleOpen()}
        className="w-9 h-9 rounded-full border border-border-default bg-surface-secondary flex items-center justify-center hover:border-brand-primary transition-all duration-150 hover:scale-110 text-base"
        aria-label="Change theme"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={theme.name}
      >
        {theme.icon}
      </button>

      {/* Theme picker dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-12 z-50 bg-surface-secondary border border-border-default rounded-xl shadow-lg p-2 min-w-[200px] animate-in fade-in"
          role="listbox"
          aria-label="Select theme"
          onKeyDown={handleDropdownKeyDown}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted px-2 py-1.5 mb-1">Theme</p>
          <div className="space-y-0.5">
            {themes.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => { optionRefs.current[i] = el; }}
                role="option"
                aria-selected={theme.id === t.id}
                onClick={() => { setThemeById(t.id); close(); }}
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
