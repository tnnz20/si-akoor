import type { CSSProperties, ReactNode } from 'react';

import { useReveal } from '~/hooks/use-reveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section';
  id?: string;
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div', id }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const style: CSSProperties = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <Tag
      ref={ref as never}
      id={id}
      style={style}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
