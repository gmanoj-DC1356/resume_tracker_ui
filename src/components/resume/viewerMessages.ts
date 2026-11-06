import { ResumeFileError, type ResumeFileErrorReason } from '@/api/endpoints/resumes.api';

// Safe, generic wording: never shows server or file details to the user.
const ERROR_MESSAGES: Record<ResumeFileErrorReason, string> = {
  unauthorized: 'You do not have access to this resume.',
  not_found: 'This resume is not available.',
  invalid_file: 'This file could not be displayed. It may be damaged or not a PDF.',
  unavailable: 'The resume could not be loaded. Please try again.',
};

export const EMPTY_MESSAGE = 'Select a candidate from the ranked matches to read their resume.';
export const LOADING_MESSAGE = 'Loading resume…';
export const RENDER_FAILED_MESSAGE = ERROR_MESSAGES.invalid_file;

export function getResumeErrorMessage(error: unknown): string {
  const reason = error instanceof ResumeFileError ? error.reason : 'unavailable';
  return ERROR_MESSAGES[reason];
}

export function isRetryable(error: unknown): boolean {
  return !(error instanceof ResumeFileError) || error.reason === 'unavailable';
}
