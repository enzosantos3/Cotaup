import { CotacaoDTO } from '../types/cotacao';

// RETIRAR PARA A INTEGRAÇÃO DA API REAL
const getBaseURL = () => {
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_API_URL 
            ? `http://localhost:3000${process.env.NEXT_PUBLIC_API_URL}`
            : 'http://localhost:3000/api';
    }
    return process.env.NEXT_PUBLIC_API_URL || '/api';
};

export const cotacaoService = {

    getAllCotacoes: async (): Promise<CotacaoDTO[]> => {
        const response = await fetch(`${getBaseURL()}/cotacoes`, {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
        
    },

    postCriarCotacao: async (cotacao: CotacaoDTO) : Promise<CotacaoDTO> => {
        const response = await fetch(`${getBaseURL()}/cotacoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cotacao),
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
    }
};