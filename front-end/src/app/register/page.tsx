'use client';

import { Building2, ShoppingCart, Mail, Lock, User, AlertCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Role } from "@/types/auth";

type UserType = 'fornecedor' | 'comprador' | null;

export default function RegisterPage() {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState<UserType>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            const role: Role = selectedType === 'fornecedor' ? 'FORNECEDOR' : 'COMPRADOR';
            
            await authService.register(email, password, role);
            
            setSuccess(true);
            
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err: any) {
            console.error('Erro no cadastro:', err);
            setError(err.message || 'Erro ao realizar cadastro. Tente novamente.');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Cadastro realizado!
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Sua conta foi criada com sucesso.
                    </p>
                    <p className="text-sm text-gray-500">
                        Redirecionando para o login...
                    </p>
                </div>
            </div>
        );
    }

    if (!selectedType) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="max-w-4xl w-full">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Criar Conta no <span className="text-blue-600">CotaUp</span>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Escolha o tipo de conta que deseja criar
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
                                        Cadastre sua empresa e responda cotações
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                                        Criar conta como Fornecedor →
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
                                        Crie cotações e encontre os melhores fornecedores
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <span className="text-purple-600 font-semibold group-hover:text-purple-700">
                                        Criar conta como Comprador →
                                    </span>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Já tem uma conta?{' '}
                            <button
                                onClick={() => router.push('/login')}
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Fazer login
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    {/* Header */}
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
                            Criar Conta {selectedType === 'fornecedor' ? 'Fornecedor' : 'Comprador'}
                        </h2>
                        <p className="text-gray-600">
                            Preencha seus dados para começar
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
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
                                    minLength={6}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Mínimo de 6 caracteres</p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmar Senha
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="text-gray-400" size={20} />
                                </div>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                                />
                            </div>
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
                            {loading ? 'Cadastrando...' : 'Criar Conta'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setSelectedType(null)}
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 mx-auto"
                        >
                            <ArrowLeft size={16} />
                            Voltar para seleção de perfil
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            Já tem uma conta?{' '}
                            <button
                                onClick={() => router.push('/login')}
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Fazer login
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
