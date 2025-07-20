import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const middleware = createMiddleware(routing);

const EXCLUDED_PATHS = ['/reletra', '/modguard', '/favicon.ico'];

export default function customMiddleware(request: any) {
  const url = new URL(request.url);

  // Se for rota excluída, passa direto sem aplicar middleware do next-intl
  if (EXCLUDED_PATHS.some(path => url.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Caso contrário, chama o middleware do next-intl
  return middleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
