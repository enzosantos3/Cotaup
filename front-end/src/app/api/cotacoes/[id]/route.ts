import { CotacaoDTO, CotacaoStatus } from "@/types/cotacao";
import { NextResponse } from "next/server";

const cotacoes: CotacaoDTO[] = [
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

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string}> }
) {
    try {
        const params = await context.params;
        const id = parseInt(params.id);

        const cotacao = cotacoes.find(c => c.id === id);

        if (!cotacao) {
            return NextResponse.json(
                { error: 'Cotação não encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json(cotacao);
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar cotação' },
            { status: 500 }
        );
    }
}