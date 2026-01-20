import { PEDIDO_ENDPOINTS, getApiUrl } from "@/config/api";
import { PedidoDTO } from "@/types/pedido";

export const pedidoService = {

    getAllPedidos: async (): Promise<PedidoDTO[]> => {
        const response = await fetch(getApiUrl(PEDIDO_ENDPOINTS.listar), {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
        
    },

    postCriarPedido: async (pedido: Omit<PedidoDTO, 'id'>) : Promise<PedidoDTO> => {
        const response = await fetch(getApiUrl(PEDIDO_ENDPOINTS.criar), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });

        if (!response.ok) throw new Error('Erro ao criar pedido');
        return response.json();
    },

    getPedidoById: async (id: number): Promise<PedidoDTO> => {
        const response = await fetch(getApiUrl(PEDIDO_ENDPOINTS.detalhe(id)), {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao buscar pedido');
        return response.json();
    },



};