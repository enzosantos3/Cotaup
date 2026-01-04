import { NextResponse } from 'next/server';
import { CotacaoDTO, CotacaoStatus } from '@/types/cotacao';

let cotacoes: CotacaoDTO[] = [
    {
        id: 1,
        nome: 'Cotação 001 - Materiais de Construção',
        dataInicio: '2025-01-10',
        dataFim: '2025-01-25',
        status: CotacaoStatus.ABERTA,
    },
    {
        id: 2,
        nome: 'Cotação 002 - Equipamentos de TI',
        dataInicio: '2025-02-01',
        dataFim: '2025-02-15',
        status: CotacaoStatus.FECHADA,
    },
    {
        id: 3,
        nome: 'Cotação 003 - Material de Escritório',
        dataInicio: '2025-03-01',
        dataFim: '2025-03-20',
        status: CotacaoStatus.ABERTA,
    },
];

export async function GET() {
    return NextResponse.json(cotacoes);
}

export async function POST(request: Request) {
    try {
        const novaCotacao: Omit<CotacaoDTO, 'id'> = await request.json();
        
        const novoId = cotacoes.length > 0 ? Math.max(...cotacoes.map(c => c.id)) + 1 : 1;
        const cotacaoComId: CotacaoDTO = { ...novaCotacao, id: novoId };
        
        cotacoes.push(cotacaoComId);
        
        return NextResponse.json(cotacaoComId, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao criar cotação' },
            { status: 400 }
        );
    }
}
