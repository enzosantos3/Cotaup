export interface FornecedorDTO {
    id: number;
    usuarioId?: number;
    empresaId?: number;
    email: string;
    nomeFantasia: string;
    cnpj: string;
    role?: string;
    razaoSocial: string;
    inscricaoEstadual: string;
    endereco: string;
}