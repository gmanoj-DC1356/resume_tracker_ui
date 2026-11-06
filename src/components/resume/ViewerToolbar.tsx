import { Button } from '@/components/common/Button';
import type { ViewerControls } from '@/hooks/useViewerControls';
import { PERCENT } from './viewerConstants';

interface ViewerToolbarProps {
  controls: ViewerControls;
}

export function ViewerToolbar({ controls }: Readonly<ViewerToolbarProps>) {
  const { state, actions, canZoomIn, canZoomOut, canGoPrevious, canGoNext } = controls;
  const ready = state.numPages > 0;

  return (
    <div
      role="toolbar"
      aria-label="Resume reader controls"
      className="mb-2 flex flex-wrap items-center gap-1.5"
    >
      <Button
        size="sm"
        variant="secondary"
        aria-label="Zoom out"
        disabled={!ready || !canZoomOut}
        onClick={actions.zoomOut}
      >
        −
      </Button>
      <span aria-live="polite" className="min-w-12 text-center text-xs text-brand-muted">
        {Math.round(state.zoom * PERCENT)}%
      </span>
      <Button
        size="sm"
        variant="secondary"
        aria-label="Zoom in"
        disabled={!ready || !canZoomIn}
        onClick={actions.zoomIn}
      >
        +
      </Button>
      <Button size="sm" variant="secondary" disabled={!ready} onClick={actions.fitWidth}>
        Fit width
      </Button>
      <Button size="sm" variant="secondary" disabled={!ready} onClick={actions.rotate}>
        Rotate
      </Button>
      <Button size="sm" variant="secondary" disabled={!ready} onClick={actions.reset}>
        Reset
      </Button>
      <div className="ml-auto flex items-center gap-1.5">
        <Button
          size="sm"
          variant="secondary"
          aria-label="Previous page"
          disabled={!canGoPrevious}
          onClick={actions.previousPage}
        >
          ‹
        </Button>
        <span aria-live="polite" className="text-xs text-brand-muted">
          Page {ready ? state.page : 0} / {state.numPages}
        </span>
        <Button
          size="sm"
          variant="secondary"
          aria-label="Next page"
          disabled={!canGoNext}
          onClick={actions.nextPage}
        >
          ›
        </Button>
      </div>
    </div>
  );
}
