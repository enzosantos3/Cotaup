'use client';

import { ShoppingCart, Send, CheckCircle, TrendingUp, Search, FileText, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FornecedorDashboard() {
    // Dados mockados - futuramente virão da API
    const stats = [
        {
            title: 'Novas Oportunidades',
            value: '15',
            icon: ShoppingCart,
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            title: 'Propostas Enviadas',
            value: '28',
            icon: Send,
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            title: 'Propostas Aceitas',
            value: '12',
            icon: CheckCircle,
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            title: 'Receita do Mês',
            value: 'R$ 45k',
            icon: TrendingUp,
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
        },
    ];

    const opportunities = [
        {
            id: 1,
            title: 'Material de Escritório',
            company: 'Empresa ABC S.A.',
            location: 'São Paulo - SP',
            daysLeft: 2,
        },
        {
            id: 2,
            title: 'Equipamentos de TI',
            company: 'Tech Solutions Ltda',
            location: 'Rio de Janeiro - RJ',
            daysLeft: 5,
        },
        {
            id: 3,
            title: 'Material de Limpeza',
            company: 'Indústrias XYZ',
            location: 'Curitiba - PR',
            daysLeft: 1,
        },
    ];

    const quickActions = [
        {
            title: 'Buscar Oportunidades',
            icon: Search,
            href: '/fornecedor/marketplace',
            primary: true,
        },
        {
            title: 'Minhas Propostas',
            icon: Send,
            href: '/fornecedor/propostas',
            primary: false,
        },
        {
            title: 'Carteira de Clientes',
            icon: Users,
            href: '/fornecedor/clientes',
            primary: false,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                    Bem-vindo de volta! Veja suas oportunidades e performance.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                                <stat.icon className={stat.iconColor} size={28} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Novas Oportunidades</h2>
                        <Link
                            href="/fornecedor/marketplace"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Ver Marketplace
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {opportunities.map((opportunity) => (
                            <div
                                key={opportunity.id}
                                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
                                            {opportunity.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">{opportunity.company}</p>
                                        <p className="text-sm text-gray-500 mt-1">{opportunity.location}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                opportunity.daysLeft <= 2
                                                    ? 'bg-red-100 text-red-700'
                                                    : opportunity.daysLeft <= 5
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            {opportunity.daysLeft} {opportunity.daysLeft === 1 ? 'dia' : 'dias'}
                                        </span>
                                        <ArrowRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
                        <div className="space-y-3">
                            {quickActions.map((action, index) => (
                                <Link
                                    key={index}
                                    href={action.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                        action.primary
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                    <action.icon size={20} />
                                    <span>{action.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Performance</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Taxa de Aceitação</span>
                                    <span className="text-sm font-bold text-gray-900">42%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Avaliação</span>
                                    <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                                        4.8 <span className="text-yellow-500">⭐</span>
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '96%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
