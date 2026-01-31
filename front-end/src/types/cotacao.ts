export enum CotacaoStatus {
    ABERTA = 'ABERTA',
    FINALIZADA = 'FINALIZADA',
}

export interface ProdutoCotacaoRequest {
    produtoId: number;
    quantidade: number;
    valorUnitario: number;
}

export interface CotacaoDTO {
    id: number;
    name: string;
    dataInicio: string;
    dataFim: string;
    status: CotacaoStatus;
    observacoes: string;
    produtos: ProdutoCotacaoRequest[];
}