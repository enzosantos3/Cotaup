import { NextResponse } from 'next/server';
import { CotacaoDTO, CotacaoStatus } from '@/types/cotacao';

// Dados mock das cotações (mesma lista da rota principal)
let cotacoes: CotacaoDTO[] = [
    {
        id: 1,
        nome: 'Cotação 001 - Materiais de Construção',
        dataInicio: '2026-01-10',
        dataFim: '2026-01-25',
        status: CotacaoStatus.ABERTA,
    },
    {
        id: 2,
        nome: 'Cotação 002 - Equipamentos de TI',
        dataInicio: '2026-01-15',
        dataFim: '2026-02-15',
        status: CotacaoStatus.FECHADA,
    },
    {
        id: 3,
        nome: 'Cotação 003 - Material de Escritório',
        dataInicio: '2026-01-20',
        dataFim: '2026-02-28',
        status: CotacaoStatus.ABERTA,
    },
    {
        id: 4,
        nome: 'Cotação 004 - Equipamentos de Segurança',
        dataInicio: '2026-01-18',
        dataFim: '2026-02-10',
        status: CotacaoStatus.ABERTA,
    },
    {
        id: 5,
        nome: 'Cotação 005 - Móveis de Escritório',
        dataInicio: '2026-01-12',
        dataFim: '2026-01-30',
        status: CotacaoStatus.ABERTA,
    },
];

export async function GET() {
    // Filtra apenas cotações com status ABERTA
    const cotacoesAbertas = cotacoes.filter(c => c.status === CotacaoStatus.ABERTA);
    return NextResponse.json(cotacoesAbertas);
}
