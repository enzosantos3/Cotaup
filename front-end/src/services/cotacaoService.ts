import { CotacaoDTO } from '../types/cotacao';
import { ProdutoCotacaoDTO } from '../types/produtoCotacao';
import { API_BASE_URL, COTACOES_ENDPOINTS, PRODUTOCOTACAO_ENDPOINTS, getApiUrl } from '../config/api';
import { authService } from './authService';

export const cotacaoService = {

    getAllCotacoes: async (): Promise<CotacaoDTO[]> => {
        const response = await fetch(getApiUrl(COTACOES_ENDPOINTS.listar), {
            cache: `no-store`,
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) throw new Error('Erro ao conectar com a API');
        return response.json();
        
    },

    postCriarCotacao: async (cotacao: any) : Promise<any> => {
        const headers = {
            'Content-Type': 'application/json',
            ...authService.getAuthHeader(),
        };
        
        console.log('[CotacaoService] Criando cotação com headers:', headers);
        console.log('[CotacaoService] Dados da cotação:', cotacao);
        
        const response = await fetch(getApiUrl(COTACOES_ENDPOINTS.criar), {
            method: 'POST',
            headers,
            body: JSON.stringify(cotacao),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[CotacaoService] Erro ao criar cotação:', response.status, errorText);
            throw new Error(`Erro ao criar cotação: ${response.status}`);
        }
        return response.json();
    },

    getCotacaoById: async (id: number): Promise<CotacaoDTO> => {
        const response = await fetch(getApiUrl(COTACOES_ENDPOINTS.detalhe(id)), {
            cache: `no-store`,
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[CotacaoService] Erro ao buscar cotação por ID:', response.status, errorText);
            throw new Error('Erro ao buscar cotação');
        }
        
        const data = await response.json();
        console.log('[CotacaoService] Cotação recebida:', data);
        return data;
    },

    getCotacoesAbertas: async (): Promise<CotacaoDTO[]> => {
        const response = await fetch(getApiUrl('/cotacoes/listar/abertas'), {
            cache: `no-store`,
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) throw new Error('Erro ao buscar cotações abertas');
        return response.json();
    },

    getCotacoesFinalizadas: async (): Promise<CotacaoDTO[]> => {
        const response = await fetch(getApiUrl('/cotacoes/listar/finalizadas'), {
            cache: `no-store`,
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) throw new Error('Erro ao buscar cotações finalizadas');
        return response.json();
    },

    getProdutosCotacao: async (cotacaoId: number): Promise<ProdutoCotacaoDTO[]> => {
        const response = await fetch(getApiUrl(PRODUTOCOTACAO_ENDPOINTS.listarProdutos(cotacaoId)), {
            cache: `no-store`,
            headers: {
                ...authService.getAuthHeader(),
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[CotacaoService] Erro ao buscar produtos da cotação:', response.status, errorText);
            throw new Error('Erro ao buscar produtos da cotação');
        }
        return response.json();
    }

};