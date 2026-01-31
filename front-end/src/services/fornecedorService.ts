import { FornecedorDTO } from "@/types/fornecedor";
import { getApiUrl, FORNECEDOR_ENDPOINTS } from "@/config/api";
import { authService } from "./authService";

export const fornecedorService = {

    getAllFornecedores: async (): Promise<FornecedorDTO[]> => {
        const response = await fetch(getApiUrl(FORNECEDOR_ENDPOINTS.listar), {
            cache: `no-store`,
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[FornecedorService] Erro ao buscar fornecedores:', response.status, errorText);
            throw new Error('Erro ao conectar com a API');
        }
        return response.json();
    },

    getFornecedorById: async (id: number): Promise<FornecedorDTO> => {
        const response = await fetch(getApiUrl(FORNECEDOR_ENDPOINTS.detalhe(id)), {
            cache: `no-store`,
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[FornecedorService] Erro ao buscar fornecedor por ID:', response.status, errorText);
            throw new Error('Erro ao buscar fornecedor');
        }
        return response.json();
    },

    postCriarFornecedor: async (fornecedor: Omit<FornecedorDTO, 'id'>) : Promise<FornecedorDTO> => {
        const response = await fetch(getApiUrl(FORNECEDOR_ENDPOINTS.criar), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authService.getAuthHeader(),
            },
            body: JSON.stringify(fornecedor),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[FornecedorService] Erro ao criar fornecedor:', response.status, errorText);
            throw new Error('Erro ao conectar com a API');
        }
        return response.json();
    },

    putAtualizarFornecedor: async (id: number, fornecedor: Omit<FornecedorDTO, 'id'>): Promise<FornecedorDTO> => {
        const response = await fetch(getApiUrl(FORNECEDOR_ENDPOINTS.atualizar(id)), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...authService.getAuthHeader(),
            },
            body: JSON.stringify(fornecedor),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[FornecedorService] Erro ao atualizar fornecedor:', response.status, errorText);
            throw new Error('Erro ao atualizar fornecedor');
        }
        return response.json();
    },

    deleteFornecedor: async (id: number): Promise<void> => {
        const response = await fetch(getApiUrl(FORNECEDOR_ENDPOINTS.deletar(id)), {
            method: 'DELETE',
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[FornecedorService] Erro ao deletar fornecedor:', response.status, errorText);
            throw new Error('Erro ao deletar fornecedor');
        }
    }
};