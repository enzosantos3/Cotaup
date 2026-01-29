'use client';

import { Building2, ShoppingCart, User, Lock, Mail, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Role } from "@/types/auth";

type UserType = 'fornecedor' | 'comprador' | null;

export default function LoginPage() {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState<UserType>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { token, user } = await authService.login(email, password);
            
            console.log('Login realizado com sucesso:', { user });
            
            const expectedRole: Role = selectedType === 'fornecedor' ? 'FORNECEDOR' : 'COMPRADOR';
            if (user.role !== expectedRole) {
                setError(`Esta conta não é de ${selectedType}. Por favor, selecione o tipo correto.`);
                authService.logout();
                setLoading(false);
                return;
            }
            
            if (user.role === 'FORNECEDOR') {
                router.push('/fornecedor/dashboard');
            } else if (user.role === 'COMPRADOR') {
                router.push('/comprador/dashboard');
            } else {
                router.push('/');
            }
        } catch (err: any) {
            console.error('Erro no login:', err);
            setError(err.message || 'Erro ao realizar login. Tente novamente.');
            setLoading(false);
        }
    };

    if (!selectedType) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="max-w-4xl w-full">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Bem-vindo ao <span className="text-blue-600">CotaUp</span>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Escolha como você deseja acessar a plataforma
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={() => setSelectedType('fornecedor')}
                            className="group bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                                    <Building2 className="text-blue-600 group-hover:text-white transition-colors duration-300" size={40} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        Fornecedor
                                    </h2>
                                    <p className="text-gray-600">
                                        Gerencie suas cotações, envie propostas e acompanhe pedidos
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                                        Acessar como Fornecedor →
                                    </span>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => setSelectedType('comprador')}
                            className="group bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
                                    <ShoppingCart className="text-purple-600 group-hover:text-white transition-colors duration-300" size={40} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        Comprador
                                    </h2>
                                    <p className="text-gray-600">
                                        Crie cotações, compare propostas e realize pedidos
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <span className="text-purple-600 font-semibold group-hover:text-purple-700">
                                        Acessar como Comprador →
                                    </span>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className="text-center mt-8 text-gray-500 text-sm">
                        <p>Plataforma de gestão de cotações e pedidos</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    <div className="text-center mb-8">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                            selectedType === 'fornecedor' ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                            {selectedType === 'fornecedor' ? (
                                <Building2 className="text-blue-600" size={32} />
                            ) : (
                                <ShoppingCart className="text-purple-600" size={32} />
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Login {selectedType === 'fornecedor' ? 'Fornecedor' : 'Comprador'}
                        </h2>
                        <p className="text-gray-600">
                            Acesse sua conta para continuar
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                E-mail
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="text-gray-400" size={20} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="text-gray-400" size={20} />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
                            </label>
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Esqueci a senha
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                                selectedType === 'fornecedor'
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-purple-600 hover:bg-purple-700'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setSelectedType(null)}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            ← Voltar para seleção de perfil
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            Não tem uma conta?{' '}
                            <button
                                type="button"
                                onClick={() => router.push('/register')}
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Cadastre-se
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}