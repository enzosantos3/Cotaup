import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware desabilitado - usando proteção client-side via layouts
 * As rotas de API agora fazem proxy para o backend, resolvendo CORS
 */
export function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: [],
};
