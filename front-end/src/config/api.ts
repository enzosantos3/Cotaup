/**
 * Configuração centralizada da API
 * Permite trocar entre mock local e backend real apenas alterando variáveis de ambiente
 */

// URL base da API
const getBaseURL = () => {
    // Se estiver no servidor (Server Component)
    if (typeof window === 'undefined') {
        return process.env.NEXT_PUBLIC_API_URL 
            ? process.env.NEXT_PUBLIC_API_URL.startsWith('http')
                ? process.env.NEXT_PUBLIC_API_URL
                : `http://localhost:3000${process.env.NEXT_PUBLIC_API_URL}`
            : 'http://localhost:3000/api';
    }
    // Se estiver no cliente (Client Component)
    return process.env.NEXT_PUBLIC_API_URL || '/api';
};

export const API_BASE_URL = getBaseURL();

// Sufixos das rotas (para compatibilidade com backend Spring Boot)
const ROUTE_SUFFIXES = {
    cotacoes: {
        listar: process.env.NEXT_PUBLIC_COTACOES_LISTAR_SUFFIX || '',
        criar: process.env.NEXT_PUBLIC_COTACOES_CRIAR_SUFFIX || '',
        detalhe: process.env.NEXT_PUBLIC_COTACOES_DETALHE_SUFFIX || '',
    },
    produtos: {
        listar: process.env.NEXT_PUBLIC_PRODUTOS_LISTAR_SUFFIX || '',
        criar: process.env.NEXT_PUBLIC_PRODUTOS_CRIAR_SUFFIX || '',
        detalhe: process.env.NEXT_PUBLIC_PRODUTOS_DETALHE_SUFFIX || '',
    },
    pedidos: {
        listar: process.env.NEXT_PUBLIC_PEDIDOS_LISTAR_SUFFIX || '',
        criar: process.env.NEXT_PUBLIC_PEDIDOS_CRIAR_SUFFIX || '',
        detalhe: process.env.NEXT_PUBLIC_PEDIDOS_DETALHE_SUFFIX || '',
    },
};

/**
 * Endpoints da API de Cotações
 */
export const COTACOES_ENDPOINTS = {
    listar: `/cotacoes${ROUTE_SUFFIXES.cotacoes.listar}`,
    criar: `/cotacoes${ROUTE_SUFFIXES.cotacoes.criar}`,
    detalhe: (id: number) => `/cotacoes${ROUTE_SUFFIXES.cotacoes.detalhe}/${id}`,
    atualizar: (id: number) => `/cotacoes/${id}`,
    deletar: (id: number) => `/cotacoes/${id}`,
};

/**
 * Endpoints da API de Produtos
 */
export const PRODUTOS_ENDPOINTS = {
    listar: `/produtos${ROUTE_SUFFIXES.produtos.listar}`,
    criar: `/produtos${ROUTE_SUFFIXES.produtos.criar}`,
    detalhe: (id: number) => `/produtos${ROUTE_SUFFIXES.produtos.detalhe}/${id}`,
    atualizar: (id: number) => `/produtos/${id}`,
    deletar: (id: number) => `/produtos/${id}`,
};

/**
 * Endpoints da API de ProdutoCotacao
 */

export const PRODUTOCOTACAO_ENDPOINTS = {
    listarProdutos: (id: number) => `/produto-cotacao/listar/${id}`,
};

export const PEDIDO_ENDPOINTS = {
    listar: `/pedidos${ROUTE_SUFFIXES.pedidos.listar}`,
    criar: `/pedidos${ROUTE_SUFFIXES.pedidos.criar}`,
    detalhe: (id: number) => `/pedidos${ROUTE_SUFFIXES.pedidos.detalhe}/${id}`,
    atualizar: (id: number) => `/pedidos/${id}`,
    deletar: (id: number) => `/pedidos/${id}`,
};

/**
 * Helper para obter URL completa
 */
export const getApiUrl = (endpoint: string) => {
    return `${API_BASE_URL}${endpoint}`;
};
