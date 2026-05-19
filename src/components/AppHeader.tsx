import Link from 'next/link';
import LogoutButton from './LogoutButton';

interface AppHeaderProps {
  userName?: string | null;
}

export default function AppHeader({ userName }: AppHeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-[#0c1428] px-6 py-4 flex items-center justify-between">
      <Link href="/dashboard" className="font-semibold text-white">
        COOTRAVIR Propuestas
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {userName && <span className="text-slate-400">{userName}</span>}
        <LogoutButton />
      </div>
    </header>
  );
}
