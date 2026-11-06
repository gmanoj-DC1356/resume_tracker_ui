import { Button } from '@/components/common/Button';

type ViewerStatusKind = 'empty' | 'loading' | 'error';

interface ViewerStatusProps {
  kind: ViewerStatusKind;
  message: string;
  onRetry?: () => void;
}

// Same height as the page area so the layout does not jump between states.
export function ViewerStatus({ kind, message, onRetry }: Readonly<ViewerStatusProps>) {
  const role = kind === 'error' ? 'alert' : 'status';
  return (
    <div
      role={role}
      className="flex h-[28rem] flex-col items-center justify-center gap-3 rounded-lg bg-brand-line/60 p-6 text-center text-sm text-brand-muted"
    >
      <p>{message}</p>
      {onRetry && (
        <Button size="sm" variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
