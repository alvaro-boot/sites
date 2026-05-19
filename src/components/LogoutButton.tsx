'use client';

export default function LogoutButton() {
  return (
    <button
      type="button"
      className="text-slate-300 hover:text-white"
      onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/login';
      }}
    >
      Salir
    </button>
  );
}
