'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie } from '@/utils/cookies';

export default function DebugTokenPage() {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [role, setRole] = useState<'COMPRADOR' | 'FORNECEDOR'>('COMPRADOR');
    const [currentToken, setCurrentToken] = useState('');
    const [currentCookie, setCurrentCookie] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        const cookieToken = getCookie('auth_token');
        setCurrentToken(storedToken || 'Nenhum token no localStorage');
        setCurrentCookie(cookieToken || 'Nenhum token no cookie');
    }, []);

    const handleSetToken = () => {
        if (!token) {
            alert('Insira um token válido');
            return;
        }

        localStorage.setItem('auth_token', token);
        setCookie('auth_token', token, 7);

        const user = {
            id: 1,
            email: 'debug@test.com',
            role: role
        };
        localStorage.setItem('auth_user', JSON.stringify(user));

        setCurrentToken(token);
        const cookieToken = getCookie('auth_token');
        setCurrentCookie(cookieToken || 'Erro ao salvar cookie');

        alert('Token salvo! Verifique os valores abaixo antes de redirecionar.');
    };

    const handleClearToken = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        document.cookie = 'auth_token=; Max-Age=0; path=/';
        setCurrentToken('Nenhum token no localStorage');
        setCurrentCookie('Nenhum token no cookie');
        alert('Token removido!');
    };

    const handleNavigate = () => {
        if (role === 'COMPRADOR') {
            router.push('/comprador/dashboard');
        } else {
            router.push('/fornecedor/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    🔧 Debug - Inserir Token JWT
                </h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Token JWT
                        </label>
                        <textarea
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Cole seu token JWT aqui..."
                            rows={6}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role do Usuário
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value as 'COMPRADOR' | 'FORNECEDOR')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                            <option value="COMPRADOR">COMPRADOR</option>
                            <option value="FORNECEDOR">FORNECEDOR</option>
                        </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleSetToken}
                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Salvar Token
                        </button>
                        <button
                            onClick={handleNavigate}
                            className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Ir para Dashboard
                        </button>
                        <button
                            onClick={handleClearToken}
                            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                            Limpar Token
                        </button>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-3">📊 Status Atual</h3>
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="font-medium text-gray-700">LocalStorage:</span>
                                <p className="text-gray-600 font-mono break-all mt-1">{currentToken}</p>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Cookie:</span>
                                <p className="text-gray-600 font-mono break-all mt-1">{currentCookie}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">ℹ️ Informações</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Token será salvo em localStorage e cookie</li>
                        <li>• Cookie necessário para o middleware funcionar</li>
                        <li>• Após salvar, você será redirecionado automaticamente</li>
                    </ul>
                </div>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => router.push('/login')}
                        className="text-sm text-blue-600 hover:text-blue-700"
                    >
                        ← Voltar para Login
                    </button>
                </div>
            </div>
        </div>
    );
}
