import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`rounded-xl border border-brand-line bg-brand-surface p-4 ${className}`}>
      {title && <h3 className="mb-3 text-base font-semibold text-brand-primary">{title}</h3>}
      {children}
    </div>
  );
}
