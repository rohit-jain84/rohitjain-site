import { useState, useEffect, useRef, useCallback } from 'react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export function ImageLightbox({ src, alt, className = '', caption }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'Tab') {
        // Trap focus on close button
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox]);

  return (
    <>
      <figure
        ref={triggerRef}
        className={`cursor-zoom-in group ${className}`}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(true); } }}
        tabIndex={0}
        role="button"
        aria-label={`View full size: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {caption && (
          <figcaption className="text-xs text-text-muted mt-2 px-1">{caption}</figcaption>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-colors duration-200 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-surface-secondary/90 backdrop-blur-sm text-text-primary text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
            Click to expand
          </span>
        </div>
      </figure>

      {/* Lightbox overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-zoom-out animate-in fade-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${alt}`}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            {caption && (
              <p className="text-sm text-white/80 text-center mt-3">{caption}</p>
            )}
            <button
              ref={closeButtonRef}
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
