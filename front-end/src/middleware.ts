import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware para proteção de rotas e validação de roles
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const publicRoutes = ['/login', '/register', '/', '/debug-token'];
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    try {
        const role = getRoleFromToken(token);

        if (pathname.startsWith('/fornecedor')) {
            if (role !== 'FORNECEDOR') {
                if (role === 'COMPRADOR') {
                    return NextResponse.redirect(new URL('/comprador/dashboard', request.url));
                }
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }

        if (pathname.startsWith('/comprador')) {
            if (role !== 'COMPRADOR') {
                if (role === 'FORNECEDOR') {
                    return NextResponse.redirect(new URL('/fornecedor/dashboard', request.url));
                }
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('auth_token');
        return response;
    }
}

function getRoleFromToken(token: string): string {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        const payload = JSON.parse(jsonPayload);
        
        return payload.role || payload.authorities?.[0]?.replace('ROLE_', '') || '';
    } catch (error) {
        throw new Error('Token inválido');
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
