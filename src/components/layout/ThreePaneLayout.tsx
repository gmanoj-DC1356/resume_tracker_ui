import type { ReactNode } from 'react';

interface ThreePaneLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}

// Mirrors the JD / highlights / history three-column workspace from the UI mockup.
export function ThreePaneLayout({ left, center, right }: ThreePaneLayoutProps) {
  return (
    <div className="grid min-h-[70vh] grid-cols-1 gap-4 p-4 lg:grid-cols-[320px_minmax(0,1fr)_320px]">
      <div className="min-w-0 rounded-xl border border-brand-line bg-brand-surface p-4">{left}</div>
      <div className="min-w-0 rounded-xl border border-brand-line bg-brand-surface p-4">
        {center}
      </div>
      <div className="min-w-0 rounded-xl border border-brand-line bg-brand-surface p-4">
        {right}
      </div>
    </div>
  );
}
