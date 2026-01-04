export enum CotacaoStatus {
    ABERTA = 'ABERTA',
    FECHADA = 'FECHADA',
}

export interface CotacaoDTO {
    id: number;
    nome: string;
    dataInicio: string;
    dataFim: string;
    status: CotacaoStatus;
}