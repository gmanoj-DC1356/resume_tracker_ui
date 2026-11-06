import { useResumeFile } from '@/hooks/useResumeFile';
import { useViewerControls } from '@/hooks/useViewerControls';
import { lazy, Suspense, useCallback, useState } from 'react';
import { ViewerStatus } from './ViewerStatus';
import { ViewerToolbar } from './ViewerToolbar';
import {
  getResumeErrorMessage,
  isRetryable,
  LOADING_MESSAGE,
  RENDER_FAILED_MESSAGE,
} from './viewerMessages';

// PDF.js is large, so it is only downloaded once a resume is actually opened.
const ViewerCanvas = lazy(() =>
  import('./ViewerCanvas').then((module) => ({ default: module.ViewerCanvas })),
);

interface ResumeDocumentViewProps {
  resumeId: string;
}

// One open resume: fetch the file, then render it with the reader controls.
// The parent remounts this (key = resumeId) so zoom, rotation and page reset per resume.
export function ResumeDocumentView({ resumeId }: Readonly<ResumeDocumentViewProps>) {
  const { data, error, isPending, isError, refetch } = useResumeFile(resumeId);
  const controls = useViewerControls();
  const [renderFailed, setRenderFailed] = useState(false);
  const handleRenderError = useCallback(() => setRenderFailed(true), []);

  if (isPending) return <ViewerStatus kind="loading" message={LOADING_MESSAGE} />;

  if (isError) {
    return (
      <ViewerStatus
        kind="error"
        message={getResumeErrorMessage(error)}
        onRetry={isRetryable(error) ? () => void refetch() : undefined}
      />
    );
  }

  if (renderFailed) return <ViewerStatus kind="error" message={RENDER_FAILED_MESSAGE} />;

  return (
    <>
      <ViewerToolbar controls={controls} />
      <Suspense fallback={<ViewerStatus kind="loading" message={LOADING_MESSAGE} />}>
        <ViewerCanvas
          file={data}
          page={controls.state.page}
          zoom={controls.state.zoom}
          rotation={controls.state.rotation}
          onDocumentLoaded={controls.actions.documentLoaded}
          onLoadError={handleRenderError}
        />
      </Suspense>
    </>
  );
}
