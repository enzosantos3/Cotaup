import { getApiUrl, PRODUTOCOTACAO_ENDPOINTS } from "@/config/api";
import { ProdutoCotacaoDTO } from "@/types/produtoCotacao";

export const produtoCotacaoService = {

    getProdutoCotacaoById: async (id: number): Promise<ProdutoCotacaoDTO> => {
        const response = await fetch(getApiUrl(PRODUTOCOTACAO_ENDPOINTS.listarProdutos(id)), {
            cache: `no-store`,
        });

        if (!response.ok) throw new Error('Erro ao buscar produtos da cotação');
        return response.json();
    }

};