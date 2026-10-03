import { useEffect, useRef, useState } from 'react';

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: UseRevealOptions) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');
  const optionsRef = useRef(options);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      {
        threshold: optionsRef.current?.threshold ?? 0.15,
        rootMargin: optionsRef.current?.rootMargin,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}
