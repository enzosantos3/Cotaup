import { LoginRequest, RegisterRequest, TokenResponse, User, Role } from '@/types/auth';
import { setCookie, deleteCookie } from '@/utils/cookies';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

class AuthService {
    async login(email: string, senha: string): Promise<{ token: string; user: User }> {
        const loginData: LoginRequest = { email, senha };

        console.log('[AuthService] Iniciando login...');

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include',
        });

        if (!response.ok) {
            console.log('[AuthService] Erro no login:', response.status);
            if (response.status === 401) {
                throw new Error('Email ou senha inválidos');
            }
            throw new Error('Erro ao realizar login. Tente novamente.');
        }

        const data: TokenResponse = await response.json();
        console.log('[AuthService] Resposta do login recebida');
        
        const user = this.decodeToken(data.token);
        console.log('[AuthService] Token decodificado:', user);
        
        this.saveToken(data.token);
        this.saveUser(user);
        console.log('[AuthService] Token e usuário salvos no localStorage');

        return { token: data.token, user };
    }

    async register(email: string, senha: string, role: Role): Promise<void> {
        const registerData: RegisterRequest = { email, senha, role };

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        });

        if (!response.ok) {
            if (response.status === 400) {
                const error = await response.text();
                throw new Error(error || 'Dados inválidos');
            }
            if (response.status === 409) {
                throw new Error('Email já cadastrado');
            }
            throw new Error('Erro ao realizar cadastro. Tente novamente.');
        }
    }

    async logout(): Promise<void> {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            deleteCookie(TOKEN_KEY);
        }
    }

    getToken(): string | null {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem(TOKEN_KEY);
            console.log('[AuthService] getToken:', token ? 'Token encontrado' : 'Nenhum token');
            return token;
        }
        return null;
    }

    getUser(): User | null {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem(USER_KEY);
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    console.log('[AuthService] getUser:', user);
                    return user;
                } catch {
                    console.log('[AuthService] getUser: Erro ao parsear usuário');
                    return null;
                }
            }
            console.log('[AuthService] getUser: Nenhum usuário no localStorage');
        }
        return null;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        console.log('[AuthService] isAuthenticated - token existe?', !!token);
        if (!token) return false;

        try {
            const payload = this.parseJwt(token);
            const expiration = payload.exp * 1000;
            const isValid = Date.now() < expiration;
            console.log('[AuthService] isAuthenticated - token válido?', isValid);
            return isValid;
        } catch {
            console.log('[AuthService] isAuthenticated - erro ao validar token');
            return false;
        }
    }

    private saveToken(token: string): void {
        if (typeof window !== 'undefined') {
            console.log('[AuthService] Salvando token no localStorage e cookie');
            localStorage.setItem(TOKEN_KEY, token);
            setCookie(TOKEN_KEY, token, 7);
            console.log('[AuthService] Token salvo com sucesso');
        }
    }

    private saveUser(user: User): void {
        if (typeof window !== 'undefined') {
            console.log('[AuthService] Salvando usuário no localStorage:', user);
            localStorage.setItem(USER_KEY, JSON.stringify(user));
            console.log('[AuthService] Usuário salvo com sucesso');
        }
    }

    private decodeToken(token: string): User {
        const payload = this.parseJwt(token);
        
        return {
            id: payload.userId || 0,
            email: payload.sub,
            role: payload.role || payload.authorities?.[0]?.replace('ROLE_', '') as Role,
        };
    }

    private parseJwt(token: string): any {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            throw new Error('Token inválido');
        }
    }

    getAuthHeader(): { Authorization: string } | {} {
        const token = this.getToken();
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
        return {};
    }
}

export const authService = new AuthService();
