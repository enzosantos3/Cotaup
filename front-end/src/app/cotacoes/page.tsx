import { cotacaoService } from "@/services/cotacaoService";
import { CotacaoDTO } from "@/types/cotação";
import Link from "next/link";
import { Plus, FileText, Calendar, CheckCircle, XCircle } from "lucide-react";

export default async function CotacoesPage() {
    const cotacoes = await cotacaoService.getAllCotacoes();
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Cotações</h1>
                    <p className="text-gray-600 mt-1">Gerencie todas as suas cotações</p>
                </div>
                <Link
                    href="/cotacoes/create"
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
                            <p className="text-sm text-gray-600">Cotações Fechadas</p>
                            <p className="text-2xl font-bold text-gray-600 mt-1">
                                {cotacoes.filter(c => c.status === 'FECHADA').length}
                            </p>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-lg">
                            <XCircle className="text-gray-600" size={24} />
                        </div>
                    </div>
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
                            {cotacoes.map((cotacao: CotacaoDTO) => (
                                <tr key={cotacao.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FileText className="text-gray-400 mr-3" size={20} />
                                            <span className="text-sm font-medium text-gray-900">
                                                {cotacao.nome}
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
                                        <Link
                                            href={`/cotacoes/edit?id=${cotacao.id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {cotacoes.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Nenhuma cotação encontrada
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Comece criando sua primeira cotação
                            </p>
                            <Link
                                href="/cotacoes/create"
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