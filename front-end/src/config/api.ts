/**
 * Configuração centralizada da API
 */

// URL base da API real
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cotaup.com.br';

/**
 * Endpoints de Autenticação
 */
export const AUTH_ENDPOINTS = {
    login: '/auth/login',
    register: '/auth/register',
};

/**
 * Endpoints da API de Cotações
 */
export const COTACOES_ENDPOINTS = {
    listar: '/cotacoes/listar',
    criar: '/cotacoes/criar',
    detalhe: (id: number) => `/cotacoes/listar/${id}`,
    abertas: '/cotacoes/listar/abertas',
    finalizadas: '/cotacoes/listar/finalizadas',
    atualizar: (id: number) => `/cotacoes/${id}`,
    deletar: (id: number) => `/cotacoes/${id}`,
};

/**
 * Endpoints da API de Produtos
 */
export const PRODUTOS_ENDPOINTS = {
    listar: '/produtos/listar',
    criar: '/produtos/criar',
    detalhe: (id: number) => `/produtos/listar/${id}`,
    atualizar: (id: number) => `/produtos/atualizar/${id}`,
    deletar: (id: number) => `/produtos/deletar/${id}`,
};

/**
 * Endpoints da API de ProdutoCotacao
 */
export const PRODUTOCOTACAO_ENDPOINTS = {
    listarProdutos: (id: number) => `/produto-cotacao/listar/${id}`,
};

/**
 * Endpoints da API de Pedidos
 */
export const PEDIDO_ENDPOINTS = {
    listar: '/pedidos/listar',
    criar: '/pedidos/criar',
    detalhe: (id: number) => `/pedidos/listar/${id}`,
    atualizar: (id: number) => `/pedidos/${id}`,
    deletar: (id: number) => `/pedidos/${id}`,
};

/**
 * Helper para obter URL completa
 */
export const getApiUrl = (endpoint: string) => {
    return `${API_BASE_URL}${endpoint}`;
};
