'use client';

import { FileText, Clock, CheckCircle2, TrendingDown, Plus, Package, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MetricCard {
    label: string;
    value: number | string;
    icon: React.ReactNode;
    bgColor: string;
    iconColor: string;
}

interface RecentQuote {
    id: number;
    title: string;
    proposalsCount: number;
    daysAgo: number | null;
    status: 'open' | 'waiting' | 'finished';
}

export default function CompradorDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userType = localStorage.getItem('userType');
        if (userType !== 'comprador') {
            router.push('/login');
        }
        setLoading(false);
    }, [router]);

    const metrics: MetricCard[] = [
        {
            label: 'Cotações Abertas',
            value: 8,
            icon: <FileText size={28} />,
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
        {
            label: 'Aguardando Resposta',
            value: 12,
            icon: <Clock size={28} />,
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600'
        },
        {
            label: 'Finalizadas',
            value: 45,
            icon: <CheckCircle2 size={28} />,
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600'
        },
        {
            label: 'Economia do Mês',
            value: 'R$ 12,5k',
            icon: <TrendingDown size={28} />,
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600'
        }
    ];

    const recentQuotes: RecentQuote[] = [
        {
            id: 1,
            title: 'Material de Escritório',
            proposalsCount: 5,
            daysAgo: 2,
            status: 'open'
        },
        {
            id: 2,
            title: 'Equipamentos de TI',
            proposalsCount: 8,
            daysAgo: 5,
            status: 'waiting'
        },
        {
            id: 3,
            title: 'Material de Limpeza',
            proposalsCount: 12,
            daysAgo: null,
            status: 'finished'
        }
    ];

    const getStatusBadge = (quote: RecentQuote) => {
        if (quote.status === 'finished') {
            return <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Finalizado</span>;
        }
        return <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">{quote.daysAgo} dias</span>;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Bem-vindo de volta! Aqui está o resumo das suas cotações.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                            {metrics.map((metric, index) => (
                                <div 
                                    key={index}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
                                        <div className={`${metric.bgColor} ${metric.iconColor} p-3 rounded-lg`}>
                                            {metric.icon}
                                        </div>
                                    </div>
                                    <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Cotações Recentes</h2>
                                <button
                                    onClick={() => router.push('/comprador/cotacoes')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Ver Todas
                                </button>
                            </div>

                            <div className="space-y-4">
                                {recentQuotes.map((quote) => (
                                    <div 
                                        key={quote.id}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => router.push(`/comprador/cotacoes/${quote.id}`)}
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">{quote.title}</h3>
                                            <p className="text-sm text-gray-600">{quote.proposalsCount} propostas recebidas</p>
                                        </div>
                                        <div>
                                            {getStatusBadge(quote)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
                            
                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push('/comprador/cotacoes/create')}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    <Plus size={20} />
                                    Nova Cotação
                                </button>

                                <button
                                    onClick={() => router.push('/comprador/pedidos')}
                                    className="w-full flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                                >
                                    <Package size={20} />
                                    Ver Pedidos
                                </button>

                                <button
                                    onClick={() => {/* TODO: Implementar mensagens */}}
                                    className="w-full flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                                >
                                    <MessageSquare size={20} />
                                    Mensagens
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}
