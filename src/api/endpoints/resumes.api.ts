import { apiClient } from '@/api/axiosClient';
import axios from 'axios';

export const PDF_MIME_TYPE = 'application/pdf';

const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;
const HTTP_NOT_FOUND = 404;
const HTTP_UNSUPPORTED_MEDIA = 415;
const HTTP_UNPROCESSABLE = 422;

export type ResumeFileErrorReason = 'unauthorized' | 'not_found' | 'invalid_file' | 'unavailable';

// A small, UI-safe error: carries only a reason code, never server details.
export class ResumeFileError extends Error {
  readonly reason: ResumeFileErrorReason;

  constructor(reason: ResumeFileErrorReason) {
    super(reason);
    this.name = 'ResumeFileError';
    this.reason = reason;
  }
}

const REASON_BY_STATUS: Record<number, ResumeFileErrorReason> = {
  [HTTP_UNAUTHORIZED]: 'unauthorized',
  [HTTP_FORBIDDEN]: 'unauthorized',
  [HTTP_NOT_FOUND]: 'not_found',
  [HTTP_UNSUPPORTED_MEDIA]: 'invalid_file',
  [HTTP_UNPROCESSABLE]: 'invalid_file',
};

function toResumeFileError(error: unknown): ResumeFileError {
  if (error instanceof ResumeFileError) return error;
  if (axios.isAxiosError(error) && error.response) {
    return new ResumeFileError(REASON_BY_STATUS[error.response.status] ?? 'unavailable');
  }
  return new ResumeFileError('unavailable');
}

// GET /api/v1/resumes/{id}/file/ — the backend checks access to this specific resume.
// The file is fetched as a Blob through the shared client so the auth header is attached
// and no token ever appears in a URL.
export async function fetchResumeFile(resumeId: string, signal?: AbortSignal): Promise<Blob> {
  try {
    const { data } = await apiClient.get<Blob>(`/resumes/${encodeURIComponent(resumeId)}/file/`, {
      responseType: 'blob',
      signal,
    });
    // Reject anything that is not a PDF (e.g. an HTML error page from a proxy).
    if (!(data instanceof Blob) || data.type !== PDF_MIME_TYPE) {
      throw new ResumeFileError('invalid_file');
    }
    return data;
  } catch (error) {
    throw toResumeFileError(error);
  }
}
