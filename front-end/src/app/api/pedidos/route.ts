import { PedidoDTO } from "@/types/pedido";

let pedidos: PedidoDTO[] = [
    {
        id: 1,
        criadoEm: '2025-01-15T10:30:00Z',
        idComprador: 101,
        idFornecedor: 201,
        idCotacao: 1,
        idUsuarioCriador: 1001,
    },
    {
        id: 2,
        criadoEm: '2025-02-05T14:20:00Z',
        idComprador: 102,
        idFornecedor: 202,
        idCotacao: 2,
        idUsuarioCriador: 1002,
    },
];

export async function GET() {
    return new Response(JSON.stringify(pedidos), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {
    try {
        const novoPedido: Omit<PedidoDTO, 'id'> = await request.json();
        
        const novoId = pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) + 1 : 1;
        const pedidoComId: PedidoDTO = { ...novoPedido, id: novoId };
        
        pedidos.push(pedidoComId);
        
        return new Response(JSON.stringify(pedidoComId), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Erro ao criar pedido' }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}