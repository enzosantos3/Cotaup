export type Role = 'COMPRADOR' | 'FORNECEDOR';

export interface LoginRequest {
    email: string;
    senha: string;
}

export interface RegisterRequest {
    email: string;
    senha: string;
    role: Role;
}

export interface TokenResponse {
    token: string;
}

export interface User {
    id: number;
    email: string;
    role: Role;
}
