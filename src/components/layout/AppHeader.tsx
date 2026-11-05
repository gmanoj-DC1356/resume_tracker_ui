import { useAuth } from '@/auth/useAuth';
import { Button } from '@/components/common/Button';

export function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between bg-brand-primary px-6 py-3 text-white">
      <div className="flex items-center gap-2">
        <span className="inline-block h-6 w-6 rounded-md bg-brand-secondary" aria-hidden="true" />
        <b className="text-sm">Recruitment Copilot</b>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
          👤 {user?.displayName ?? 'Demo User'} · SSO
        </span>
        <Button variant="secondary" size="sm" onClick={logout}>
          Sign out
        </Button>
      </div>
    </header>
  );
}
