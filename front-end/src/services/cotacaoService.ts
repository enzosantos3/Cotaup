import { CotacaoDTO } from '../types/cotacao';
import { ProdutoCotacaoDTO } from '../types/produtoCotacao';
import { API_BASE_URL, COTACOES_ENDPOINTS, getApiUrl } from '../config/api';

export const cotacaoService = {

    getAllCotacoes: async (): Promise<CotacaoDTO[]> => {
        const response = await fetch(getApiUrl(COTACOES_ENDPOINTS.listar), {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
        
    },

    postCriarCotacao: async (cotacao: Omit<CotacaoDTO, 'id'>) : Promise<CotacaoDTO> => {
        const response = await fetch(getApiUrl(COTACOES_ENDPOINTS.criar), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cotacao),
        });

        if (!response.ok) throw new Error('Erro ao criar cotação');
        return response.json();
    },

    getCotacaoById: async (id: number): Promise<CotacaoDTO> => {
        const response = await fetch(getApiUrl(COTACOES_ENDPOINTS.detalhe(id)), {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao buscar cotação');
        return response.json();
    },

    getCotacoesAbertas: async (): Promise<CotacaoDTO[]> => {
        const response = await fetch(getApiUrl('/cotacoes/listar/abertas'), {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao buscar cotações abertas');
        return response.json();
    },

    getCotacoesFinalizadas: async (): Promise<CotacaoDTO[]> => {
        const response = await fetch(getApiUrl('/cotacoes/listar/finalizadas'), {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao buscar cotações finalizadas');
        return response.json();
    },

    getProdutosCotacao: async (cotacaoId: number): Promise<ProdutoCotacaoDTO[]> => {
        const response = await fetch(getApiUrl(`/produto-cotacao/listar/${cotacaoId}`), {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao buscar produtos da cotação');
        return response.json();
    }

};