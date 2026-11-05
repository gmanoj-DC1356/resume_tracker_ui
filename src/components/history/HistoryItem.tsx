import type { HistoryEntry } from '@/types/domain';

interface HistoryItemProps {
  entry: HistoryEntry;
}

// Placeholder — single history row (rename/delete actions) to be implemented.
export function HistoryItem({ entry }: HistoryItemProps) {
  return <div className="text-sm text-brand-muted">{entry.title}</div>;
}
