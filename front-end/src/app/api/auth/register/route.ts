import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cotaup.com.br';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.text();
            return NextResponse.json(
                { error: error || 'Erro ao realizar cadastro' },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Erro no proxy de registro:', error);
        return NextResponse.json(
            { error: 'Erro ao processar requisição' },
            { status: 500 }
        );
    }
}
