'use client';

import { Search, FileText, MapPin, Package, DollarSign, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { cotacaoService } from "@/services/cotacaoService";
import { CotacaoDTO } from "@/types/cotacao";
import Link from "next/link";

type Category = 'todas' | 'escritorio' | 'ti' | 'limpeza';

const categorias = [
    { id: 'todas' as Category, nome: 'Todas' },
    { id: 'escritorio' as Category, nome: 'Escritório' },
    { id: 'ti' as Category, nome: 'TI' },
    { id: 'limpeza' as Category, nome: 'Limpeza' }
];

export default function MarketplacePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category>('todas');
    const [cotacoes, setCotacoes] = useState<CotacaoDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCotacoes = async () => {
            try {
                const data = await cotacaoService.getCotacoesAbertas();
                setCotacoes(data);
            } catch (error) {
                console.error('Erro ao carregar cotações:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCotacoes();
    }, []);

    const filteredCotacoes = cotacoes.filter(cotacao => {
        const matchesSearch = cotacao.nome.toLowerCase().includes(searchTerm.toLowerCase());
        // TODO: Implementar filtro por categoria quando houver essa informação na API
        
        return matchesSearch;
    });

    const getDiasRestantes = (dataFim: string) => {
        const hoje = new Date();
        const fim = new Date(dataFim);
        const diffTime = fim.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const getBadgeColor = (dias: number) => {
        if (dias <= 2) return 'bg-red-100 text-red-700';
        if (dias <= 4) return 'bg-yellow-100 text-yellow-700';
        return 'bg-green-100 text-green-700';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Carregando oportunidades...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-gray-900">Marketplace de Cotações</h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Encontre oportunidades de venda para sua empresa
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar oportunidades..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria.id}
                                onClick={() => setSelectedCategory(categoria.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    selectedCategory === categoria.id
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {categoria.nome}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCotacoes.length === 0 ? (
                    <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-500 text-lg">Nenhuma cotação encontrada.</p>
                    </div>
                ) : (
                    filteredCotacoes.map((cotacao) => {
                        const diasRestantes = getDiasRestantes(cotacao.dataFim);
                        
                        return (
                            <div
                                key={cotacao.id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FileText className="text-green-600" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {cotacao.nome}
                                            </h3>
                                            <p className="text-sm text-gray-600">Cotação #{cotacao.id}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getBadgeColor(diasRestantes)}`}>
                                        {diasRestantes > 0 
                                            ? `Encerra em ${diasRestantes} ${diasRestantes === 1 ? 'dia' : 'dias'}`
                                            : 'Encerrada'
                                        }
                                    </span>
                                </div>

                                <div className="space-y-3 mb-5">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock size={16} className="text-gray-400" />
                                        <span className="text-sm">
                                            {new Date(cotacao.dataInicio).toLocaleDateString('pt-BR')} - {new Date(cotacao.dataFim).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Package size={16} className="text-gray-400" />
                                        <span className="text-sm">Ver produtos solicitados</span>
                                    </div>
                                </div>

                                <Link 
                                    href={`/fornecedor/marketplace/oportunidade/${cotacao.id}`}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors block text-center"
                                >
                                    Ver Detalhes e Enviar Proposta
                                </Link>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">{filteredCotacoes.length}</p>
                        <p className="text-gray-600 mt-1">Oportunidades Disponíveis</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">
                            {filteredCotacoes.filter(c => getDiasRestantes(c.dataFim) <= 3).length}
                        </p>
                        <p className="text-gray-600 mt-1">Encerrando em Breve</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
