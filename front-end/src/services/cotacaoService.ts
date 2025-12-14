import { CotacaoDTO } from '../types/cotação';

// Durante desenvolvimento: usa API mock local (/api)
// Para produção: trocar para a URL do backend real
const getBaseURL = () => {
    // Se estiver no servidor (Server Component)
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_API_URL 
            ? `http://localhost:3000${process.env.NEXT_PUBLIC_API_URL}`
            : 'http://localhost:3000/api';
    }
    // Se estiver no cliente (Client Component)
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