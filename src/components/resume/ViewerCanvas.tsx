import { useElementWidth } from '@/hooks/useElementWidth';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import { PAGE_HORIZONTAL_PADDING } from './viewerConstants';

// The PDF.js worker is bundled by Vite from the installed package (no external CDN).
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface ViewerCanvasProps {
  file: Blob;
  page: number;
  zoom: number;
  rotation: number;
  onDocumentLoaded: (numPages: number) => void;
  onLoadError: () => void;
}

export function ViewerCanvas({
  file,
  page,
  zoom,
  rotation,
  onDocumentLoaded,
  onLoadError,
}: Readonly<ViewerCanvasProps>) {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const pageWidth = Math.max(width - PAGE_HORIZONTAL_PADDING, 0) * zoom;

  return (
    // Stable scrollbar gutter keeps the measured width from changing when scrollbars appear.
    <div
      ref={ref}
      className="flex h-[28rem] overflow-auto rounded-lg bg-brand-line/60 p-4 [scrollbar-gutter:stable]"
    >
      {/* m-auto (not justify-center) so a page wider than the pane stays fully scrollable.
          suspense={false}: load failures go to onLoadError instead of throwing during render. */}
      <Document
        className="m-auto"
        file={file}
        suspense={false}
        loading={null}
        error={null}
        noData={null}
        onLoadSuccess={({ numPages }) => onDocumentLoaded(numPages)}
        onLoadError={onLoadError}
        onSourceError={onLoadError}
      >
        {pageWidth > 0 && (
          <Page
            pageNumber={page}
            width={pageWidth}
            rotate={rotation}
            renderAnnotationLayer={false}
            onRenderError={onLoadError}
            className="shadow-md"
          />
        )}
      </Document>
    </div>
  );
}
