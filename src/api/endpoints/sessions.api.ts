import { apiClient } from '@/api/axiosClient';
import type { HistoryEntry } from '@/types/domain';

export interface SessionFilters {
  type?: 'match' | 'questions';
  from?: string;
  to?: string;
  query?: string;
  page?: number;
}

// Sample endpoint — add further endpoints here (or in new *.api.ts files) as they are needed.
// GET /api/sessions
export async function fetchSessions(filters: SessionFilters = {}): Promise<HistoryEntry[]> {
  const { data } = await apiClient.get<unknown>('/sessions', { params: filters });
  // Reject anything but a list (e.g. an HTML page when the API is unreachable) so the UI shows its error state.
  if (!Array.isArray(data)) {
    throw new TypeError('Unexpected response from GET /sessions: expected a list');
  }
  return data as HistoryEntry[];
}
