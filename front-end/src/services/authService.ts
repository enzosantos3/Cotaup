import { AUTH_ENDPOINTS, getApiUrl } from '@/config/api';
import { LoginRequest, RegisterRequest, TokenResponse, User, Role } from '@/types/auth';
import { setCookie, deleteCookie } from '@/utils/cookies';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

class AuthService {
    async login(email: string, senha: string): Promise<{ token: string; user: User }> {
        const loginData: LoginRequest = { email, senha };

        const response = await fetch(getApiUrl(AUTH_ENDPOINTS.login), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Email ou senha inválidos');
            }
            throw new Error('Erro ao realizar login. Tente novamente.');
        }

        const data: TokenResponse = await response.json();
        
        const user = this.decodeToken(data.token);
        
        this.saveToken(data.token);
        this.saveUser(user);

        return { token: data.token, user };
    }

    async register(email: string, senha: string, role: Role): Promise<void> {
        const registerData: RegisterRequest = { email, senha, role };

        const response = await fetch(getApiUrl(AUTH_ENDPOINTS.register), {
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

    logout(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            deleteCookie(TOKEN_KEY);
        }
    }

    getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(TOKEN_KEY);
        }
        return null;
    }

    getUser(): User | null {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem(USER_KEY);
            if (userStr) {
                try {
                    return JSON.parse(userStr);
                } catch {
                    return null;
                }
            }
        }
        return null;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const payload = this.parseJwt(token);
            const expiration = payload.exp * 1000;
            return Date.now() < expiration;
        } catch {
            return false;
        }
    }

    private saveToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_KEY, token);
            setCookie(TOKEN_KEY, token, 7);
        }
    }

    private saveUser(user: User): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
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
