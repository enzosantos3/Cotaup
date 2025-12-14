import { FornecedorDTO } from "@/types/fornecedor";

// RETIRAR PARA A INTEGRAÇÃO DA API REAL
const getBaseURL = () => {
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_API_URL
            ? `http://localhost:3000${process.env.NEXT_PUBLIC_API_URL}`
            : 'http://localhost:3000/api';
    }
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

