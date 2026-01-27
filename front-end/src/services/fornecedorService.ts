import { FornecedorDTO } from "@/types/fornecedor";

const getBaseURL = () => {
    return process.env.NEXT_PUBLIC_API_URL || '/api';
};

export const fornecedorService = {

    getAllFornecedores: async (): Promise<FornecedorDTO[]> => {
        const response = await fetch(`${getBaseURL()}/fornecedores`, {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
    },

    getFornecedorById: async (id: number): Promise<FornecedorDTO> => {
        const response = await fetch(`${getBaseURL()}/fornecedores/${id}`, {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao buscar fornecedor');
        return response.json();
    },

    postCriarFornecedor: async (fornecedor: Omit<FornecedorDTO, 'id'>) : Promise<FornecedorDTO> => {
        const response = await fetch(`${getBaseURL()}/fornecedores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fornecedor),
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
    }
};

