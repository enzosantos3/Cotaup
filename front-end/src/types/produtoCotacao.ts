export interface ProdutoCotacaoDTO {
    id: number;
    nomeProduto: string;
    marca: string;
    quantidade: number;
    idCotacao: number;
}

export interface PropostaFornecedorDTO {
    id: number;
    cotacaoId: number;
    fornecedorId: number;
    fornecedorNome: string;
    fornecedorCNPJ: string;
    dataEnvio: string;
    valorTotal: number;
    prazoEntrega: number;
    observacoes?: string;
    status: 'PENDENTE' | 'ACEITA' | 'RECUSADA';
}
