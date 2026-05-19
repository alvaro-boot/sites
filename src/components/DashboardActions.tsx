'use client';

import Link from 'next/link';

export default function DashboardActions() {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/plantillas"
        className="px-4 py-2 rounded-lg border border-[#d4af37]/50 text-[#d4af37] text-sm hover:bg-[#d4af37]/10"
      >
        Plantillas del sistema
      </Link>
      <Link
        href="/propuestas/nueva"
        className="px-4 py-2 rounded-lg bg-[#0e2455] hover:bg-[#4a6fa5] text-sm text-white"
      >
        Nueva propuesta
      </Link>
    </div>
  );
}

