import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl } from '@/lib/api';
import { AUTH_COOKIE } from '@/lib/auth-server';

type RouteCtx = { params: Promise<{ path: string[] }> };

async function proxy(req: NextRequest, ctx: RouteCtx) {
  const { path } = await ctx.params;
  const segments = path ?? [];
  const targetPath = segments.join('/');
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  const target = `${getApiUrl()}/${targetPath}${req.nextUrl.search}`;
  const headers = new Headers();
  const contentType = req.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);
  headers.set('Authorization', `Bearer ${token}`);

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: 'no-store',
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = await req.arrayBuffer();
  }

  try {
    const res = await fetch(target, init);
    const body = await res.arrayBuffer();
    const outHeaders = new Headers();
    const resType = res.headers.get('content-type');
    if (resType) outHeaders.set('content-type', resType);
    return new Response(body, { status: res.status, headers: outHeaders });
  } catch {
    return NextResponse.json(
      {
        message:
          'No se pudo conectar con la API. Verifique que el backend esté en ejecución (puerto 3001).',
      },
      { status: 503 },
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
