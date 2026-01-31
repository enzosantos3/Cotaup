import { ProdutoDTO } from "@/types/produto";
import { API_BASE_URL, PRODUTOS_ENDPOINTS, getApiUrl } from '../config/api';
import { authService } from './authService';

export const produtoService = {

    getAllProdutos: async (): Promise<ProdutoDTO[]> => {
        const response = await fetch(getApiUrl(PRODUTOS_ENDPOINTS.listar), {
            cache: `no-store`,
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
    },

    getProdutoById: async (id: number): Promise<ProdutoDTO> => {
        const response = await fetch(getApiUrl(PRODUTOS_ENDPOINTS.detalhe(id)), {
            cache: `no-store`,
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) throw new Error('Erro ao buscar produto');
        return response.json();
    },

    postCriarProduto: async (produto: Omit<ProdutoDTO, 'id'>) : Promise<ProdutoDTO> => {
        const response = await fetch(getApiUrl(PRODUTOS_ENDPOINTS.criar), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authService.getAuthHeader(),
            },
            body: JSON.stringify(produto),
        });

        if (!response.ok) throw new Error('Erro ao criar produto');
        return response.json();
    },

    putAtualizarProduto: async (id: number, produto: Partial<ProdutoDTO>): Promise<ProdutoDTO> => {
        const response = await fetch(getApiUrl(PRODUTOS_ENDPOINTS.atualizar(id)), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...authService.getAuthHeader(),
            },
            body: JSON.stringify(produto),
        });

        if (!response.ok) throw new Error('Erro ao atualizar produto');
        return response.json();
    },

    deleteProduto: async (id: number): Promise<void> => {
        const response = await fetch(getApiUrl(PRODUTOS_ENDPOINTS.deletar(id)), {
            method: 'DELETE',
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) throw new Error('Erro ao deletar produto');
    },
}