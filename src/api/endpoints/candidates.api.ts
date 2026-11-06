import { apiClient } from '@/api/axiosClient';
import type { CandidateSummary } from '@/types/domain';

// Shape returned by the backend (snake_case).
interface CandidateRow {
  resume_id: string;
  name: string;
  role_title: string;
  years_experience: number;
  skills: string[];
  summary: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isCandidateRow(value: unknown): value is CandidateRow {
  return (
    isRecord(value) &&
    typeof value.resume_id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.role_title === 'string' &&
    typeof value.years_experience === 'number' &&
    typeof value.summary === 'string' &&
    Array.isArray(value.skills) &&
    value.skills.every((skill) => typeof skill === 'string')
  );
}

function toCandidateSummary(row: CandidateRow): CandidateSummary {
  return {
    resumeId: row.resume_id,
    name: row.name,
    role: row.role_title,
    yearsExperience: row.years_experience,
    skills: row.skills,
    summary: row.summary,
  };
}

// GET /api/v1/matching/candidates/ — first page only (enough for the starter list).
export async function fetchCandidates(signal?: AbortSignal): Promise<CandidateSummary[]> {
  const { data } = await apiClient.get<unknown>('/matching/candidates/', { signal });
  // Reject anything unexpected so the UI shows its error state instead of bad data.
  const results = isRecord(data) ? data.results : undefined;
  if (!Array.isArray(results) || !results.every(isCandidateRow)) {
    throw new TypeError('Unexpected response from GET /matching/candidates/');
  }
  return results.map(toCandidateSummary);
}
