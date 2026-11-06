import { useAppSelector } from '@/store/hooks';
import { ResumeDocumentView } from './ResumeDocumentView';
import { ViewerStatus } from './ViewerStatus';
import { EMPTY_MESSAGE } from './viewerMessages';

// Resume reader pane. Shows whichever candidate is selected in the ranked matches.
export function ResumeViewer() {
  const selectedResumeId = useAppSelector((state) => state.candidate.selectedResumeId);

  return (
    <section aria-labelledby="resume-viewer-title" className="mb-4">
      <h3
        id="resume-viewer-title"
        className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-primary"
      >
        Resume reader
      </h3>
      {selectedResumeId ? (
        <ResumeDocumentView key={selectedResumeId} resumeId={selectedResumeId} />
      ) : (
        <ViewerStatus kind="empty" message={EMPTY_MESSAGE} />
      )}
    </section>
  );
}
