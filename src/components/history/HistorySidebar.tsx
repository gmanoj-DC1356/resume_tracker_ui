import { Card } from '@/components/common/Card';
import { HistoryItem } from '@/components/history/HistoryItem';
import { useSessions } from '@/hooks/useSessions';
import { useAppSelector } from '@/store/hooks';
import type { HistoryFilter } from '@/store/slices/historySlice';
import type { SessionFilters } from '@/api/endpoints/sessions.api';

const DAYS_IN_WEEK = 7;
const MS_PER_DAY = 86_400_000;

function toSessionFilters(filter: HistoryFilter, searchQuery: string): SessionFilters {
  const query = searchQuery.trim() || undefined;
  if (filter === 'week') {
    return { query, from: new Date(Date.now() - DAYS_IN_WEEK * MS_PER_DAY).toISOString() };
  }
  return { query, type: filter === 'all' ? undefined : filter };
}

export function HistorySidebar() {
  const filter = useAppSelector((state) => state.history.filter);
  const searchQuery = useAppSelector((state) => state.history.searchQuery);
  const { data, isPending, isError } = useSessions(toSessionFilters(filter, searchQuery));

  return (
    <Card title="History">
      {isPending && <p className="text-sm text-brand-muted">Loading history…</p>}
      {isError && <p className="text-sm text-brand-bad">Could not load history.</p>}
      {data?.length === 0 && <p className="text-sm text-brand-muted">No sessions yet.</p>}
      {data && data.length > 0 && (
        <ul className="space-y-2">
          {data.map((entry) => (
            <li key={entry.id}>
              <HistoryItem entry={entry} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
