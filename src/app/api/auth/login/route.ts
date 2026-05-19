import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth-server';
import { getApiUrl } from '@/lib/api';

export async function POST(req: NextRequest) {
  const body = await req.json();
  let res: Response;
  try {
    res = await fetch(`${getApiUrl()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json(
      {
        message:
          'No se pudo conectar con la API. Inicie el backend (npm run start:dev en cootravir-backend, puerto 3001).',
      },
      { status: 503 },
    );
  }

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const response = NextResponse.json({
    user: data.user,
  });

  response.cookies.set(AUTH_COOKIE, data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
