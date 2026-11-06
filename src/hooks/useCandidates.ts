import { fetchCandidates } from '@/api/endpoints/candidates.api';
import { useQuery } from '@tanstack/react-query';

// Backs the starter candidate list via GET /api/v1/matching/candidates/.
export function useCandidates() {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: ({ signal }) => fetchCandidates(signal),
  });
}
