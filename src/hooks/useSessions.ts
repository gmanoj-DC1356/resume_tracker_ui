import { fetchSessions, type SessionFilters } from '@/api/endpoints/sessions.api';
import { useQuery } from '@tanstack/react-query';

// Backs the History sidebar via GET /api/sessions.
export function useSessions(filters: SessionFilters = {}) {
  return useQuery({
    queryKey: ['sessions', filters],
    queryFn: () => fetchSessions(filters),
  });
}
