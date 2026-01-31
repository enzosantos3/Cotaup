'use client';

import { cotacaoService } from "@/services/cotacaoService";
import { CotacaoDTO } from "@/types/cotacao";
import Link from "next/link";
import { Plus, FileText, Calendar, CheckCircle, XCircle, Search, X, Pen, Pencil, Eye } from "lucide-react";
import { useState, useEffect } from "react";

export default function CotacoesPage() {
    const [cotacoes, setCotacoes] = useState<CotacaoDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'TODAS' | 'ABERTA' | 'FINALIZADA'>('TODAS');
    const [filteredCotacoes, setFilteredCotacoes] = useState<CotacaoDTO[]>([]);

    useEffect(() => {
        const fetchCotacoes = async () => {
            try {
                const data = await cotacaoService.getAllCotacoes();
                setCotacoes(data);
                setFilteredCotacoes(data);
            } catch (error) {
                console.error('Erro ao carregar cotações:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCotacoes();
    }, []);

    useEffect(() => {
        let filtered = cotacoes;

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(cotacao =>
                cotacao.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cotacao.status.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'TODAS') {
            filtered = filtered.filter(cotacao => cotacao.status === statusFilter);
        }

        setFilteredCotacoes(filtered);
    }, [searchTerm, statusFilter, cotacoes]);

    const handleClearSearch = () => {
        setSearchTerm('');
        setStatusFilter('TODAS');
    };
    
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Carregando cotações...</div>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Cotações</h1>
                    <p className="text-gray-600 mt-1">Gerencie todas as suas cotações</p>
                </div>
                <Link
                    href="/comprador/cotacoes/create"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    Nova Cotação
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total de Cotações</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{cotacoes.length}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <FileText className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Cotações Abertas</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {cotacoes.filter(c => c.status === 'ABERTA').length}
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Cotações Finalizadas</p>
                            <p className="text-2xl font-bold text-gray-600 mt-1">
                                {cotacoes.filter(c => c.status === 'FINALIZADA').length}
                            </p>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <XCircle className="text-gray-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra de Pesquisa */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Pesquisar por nome ou status..."
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                    
                    {/* Filtros de Status */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStatusFilter('TODAS')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                statusFilter === 'TODAS'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Todas
                        </button>
                        <button
                            onClick={() => setStatusFilter('ABERTA')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                statusFilter === 'ABERTA'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Abertas
                        </button>
                        <button
                            onClick={() => setStatusFilter('FINALIZADA')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                statusFilter === 'FINALIZADA'
                                    ? 'bg-gray-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Finalizadas
                        </button>
                    </div>

                    {(searchTerm || statusFilter !== 'TODAS') && (
                        <div className="text-sm text-gray-600">
                            {filteredCotacoes.length} {filteredCotacoes.length === 1 ? 'resultado' : 'resultados'}
                        </div>
                    )}
                </div>
            </div>


            {/* Lista de Cotações */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Todas as Cotações</h2>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Codigo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nome
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data Início
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data Fim
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredCotacoes.map((cotacao: CotacaoDTO) => (
                                <tr key={cotacao.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FileText className="text-gray-400 mr-3" size={20} />
                                            <span className="text-sm font-medium text-gray-900">
                                                {cotacao.id}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium text-gray-900">
                                                {cotacao.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="mr-2" size={16} />
                                            {new Date(cotacao.dataInicio).toLocaleDateString('pt-BR')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="mr-2" size={16} />
                                            {new Date(cotacao.dataFim).toLocaleDateString('pt-BR')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                cotacao.status === 'ABERTA'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {cotacao.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/comprador/cotacoes/${cotacao.id}`}
                                                className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
                                                title="Ver detalhes"
                                            >
                                                <Eye size={18} /> 
                                            </Link>
                                            <Link
                                                href={`/comprador/cotacoes/edit?id=${cotacao.id}`}
                                                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                                                title="Editar cotação"
                                            >
                                                <Pencil size={18} /> 
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredCotacoes.length === 0 && searchTerm && (
                        <div className="text-center py-12">
                            <Search className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Nenhuma cotação encontrada
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Não encontramos cotações com o termo "{searchTerm}"
                            </p>
                            <button
                                onClick={handleClearSearch}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <X size={20} />
                                Limpar pesquisa
                            </button>
                        </div>
                    )}

                    {cotacoes.length === 0 && !searchTerm && (
                        <div className="text-center py-12">
                            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Nenhuma cotação encontrada
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Comece criando sua primeira cotação
                            </p>
                            <Link
                                href="/comprador/cotacoes/create"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={20} />
                                Nova Cotação
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}