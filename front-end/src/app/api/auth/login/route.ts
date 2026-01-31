import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cotaup.com.br';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        const nextResponse = NextResponse.json(data);
        
        if (data.token) {
            nextResponse.cookies.set({
                name: 'auth_token',
                value: data.token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
        }

        return nextResponse;
    } catch (error) {
        console.error('Erro no proxy de login:', error);
        return NextResponse.json(
            { error: 'Erro ao processar requisição' },
            { status: 500 }
        );
    }
}
