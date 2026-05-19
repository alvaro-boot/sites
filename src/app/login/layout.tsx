import { Suspense } from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen bg-[#070b14]" />}>{children}</Suspense>;
}
