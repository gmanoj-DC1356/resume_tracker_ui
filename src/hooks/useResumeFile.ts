import { fetchResumeFile, ResumeFileError } from '@/api/endpoints/resumes.api';
import { useQuery } from '@tanstack/react-query';

const MAX_RETRIES = 1;
// Resume files are personal data: drop them from memory soon after the viewer closes.
const CACHE_TIME_MS = 60_000;

// Only transient failures are worth retrying; "not found" or "not allowed" will not change.
function shouldRetry(failureCount: number, error: Error): boolean {
  const transient = !(error instanceof ResumeFileError) || error.reason === 'unavailable';
  return transient && failureCount < MAX_RETRIES;
}

export function useResumeFile(resumeId: string) {
  return useQuery({
    queryKey: ['resume-file', resumeId],
    queryFn: ({ signal }) => fetchResumeFile(resumeId, signal),
    retry: shouldRetry,
    gcTime: CACHE_TIME_MS,
  });
}
