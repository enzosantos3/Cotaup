import { ProdutoDTO } from "@/types/produto";

// RETIRAR PARA A INTEGRAÇÃO DA API REAL
const getBaseURL = () => {
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_API_URL
            ? `http://localhost:3000${process.env.NEXT_PUBLIC_API_URL}`
            : 'http://localhost:3000/api';
    }
    return process.env.NEXT_PUBLIC_API_URL || '/api';
};

export const produtoService = {

    getAllProdutos: async (): Promise<ProdutoDTO[]> => {
        const response = await fetch(`${getBaseURL()}/produtos`, {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
    },

    getProdutoById: async (id: number): Promise<ProdutoDTO> => {
        const response = await fetch(`${getBaseURL()}/produtos/${id}`, {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao buscar produto');
        return response.json();
    },

    postCriarProduto: async (produto: Omit<ProdutoDTO, 'id'>) : Promise<ProdutoDTO> => {
        const response = await fetch(`${getBaseURL()}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });

        if (!response.ok) throw new Error('Erro ao criar produto');
        return response.json();
    },

    putAtualizarProduto: async (id: number, produto: Partial<ProdutoDTO>): Promise<ProdutoDTO> => {
        const response = await fetch(`${getBaseURL()}/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });

        if (!response.ok) throw new Error('Erro ao atualizar produto');
        return response.json();
    },

    deleteProduto: async (id: number): Promise<void> => {
        const response = await fetch(`${getBaseURL()}/produtos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Erro ao deletar produto');
    },
}