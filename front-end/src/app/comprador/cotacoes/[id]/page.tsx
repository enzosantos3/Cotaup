'use client';

import { cotacaoService } from "@/services/cotacaoService";
import { ArrowLeft, Calendar, FileText, Package, AlertCircle, CheckCircle, XCircle, Pencil, DollarSign, Clock, Building2, ShoppingCart } from "lucide-react";
import Link from 'next/link';
import { useParams, useRouter } from "next/navigation";
import { PropostaFornecedorDTO } from "@/types/produtoCotacao";
import { useEffect, useState } from "react";
import { CotacaoDTO } from "@/types/cotacao";
import { ProdutoCotacaoDTO } from "@/types/produtoCotacao";

export default function CotacaoDetalhePage() {
    const params = useParams();
    const router = useRouter();
    const [cotacao, setCotacao] = useState<CotacaoDTO | null>(null);
    const [produtosCotacao, setProdutosCotacao] = useState<ProdutoCotacaoDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = Number(params.id);
                const cotacaoData = await cotacaoService.getCotacaoById(id);
                setCotacao(cotacaoData);
                
                try {
                    const produtosData = await cotacaoService.getProdutosCotacao(id);
                    setProdutosCotacao(produtosData);
                } catch (prodError) {
                    console.warn('Não foi possível carregar produtos da cotação:', prodError);
                    setProdutosCotacao([]);
                }
            } catch (error) {
                console.error('Erro ao buscar cotação:', error);
                router.push('/comprador/cotacoes');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchData();
        }
    }, [params.id, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Carregando cotação...</div>
            </div>
        );
    }

    if (!cotacao) {
        return null;
    }

    const propostas: PropostaFornecedorDTO[] = [
        {
            id: 1,
            cotacaoId: cotacao.id,
            fornecedorId: 1,
            fornecedorNome: "Construtora Alfa",
            fornecedorCNPJ: "12.345.678/0001-90",
            dataEnvio: "2026-01-10T10:00:00",
            valorTotal: 15500.00,
            prazoEntrega: 7,
            observacoes: "Frete incluso para a região metropolitana",
            status: "PENDENTE"
        },
        {
            id: 2,
            cotacaoId: cotacao.id,
            fornecedorId: 2,
            fornecedorNome: "Materiais Beta",
            fornecedorCNPJ: "98.765.432/0001-12",
            dataEnvio: "2026-01-11T14:30:00",
            valorTotal: 14800.00,
            prazoEntrega: 5,
            observacoes: "Desconto de 5% para pagamento à vista",
            status: "ACEITA"
        }
    ];

    const statusColor = cotacao.status === 'ABERTA' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-gray-100 text-gray-800';

    const statusIcon = cotacao.status === 'ABERTA' 
        ? <CheckCircle className="text-green-600" size={24} />
        : <XCircle className="text-gray-600" size={24} />;

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link
                    href="/comprador/cotacoes"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar para Cotações
                </Link>
                <Link
                    href={`/cotacoes/edit?id=${cotacao.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Pencil size={18} />
                    Editar Cotação
                </Link>
            </div>

            {/* Card Principal da Cotação */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Header do Card */}
                <div className="bg-linear-to-br from-blue-600 to-blue-700 px-6 py-8">
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                            <FileText className="text-white" size={48} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">
                                        {cotacao.name}
                                    </h1>
                                    <p className="text-blue-100 text-lg">Cotação #{cotacao.id}</p>
                                </div>
                                <span className={`px-4 py-2 inline-flex items-center gap-2 text-sm font-semibold rounded-full ${statusColor}`}>
                                    {cotacao.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Informações da Cotação */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Data Início */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Calendar className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Data de Início</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {new Date(cotacao.dataInicio).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Data Fim */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <Calendar className="text-orange-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Data de Encerramento</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {new Date(cotacao.dataFim).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-green-100 rounded-lg">
                                {statusIcon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Status da Cotação</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {cotacao.status === 'ABERTA' ? 'Aberta para propostas' : 'Encerrada'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seção de Produtos da Cotação */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ShoppingCart className="text-blue-600" size={28} />
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">Produtos Solicitados</h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    {produtosCotacao.length} {produtosCotacao.length === 1 ? 'produto solicitado' : 'produtos solicitados'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {produtosCotacao.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Produto
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Marca
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantidade
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {produtosCotacao.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-mono text-gray-600">#{item.id}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                                        <Package className="text-blue-600" size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {item.nomeProduto}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{item.marca}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {item.quantidade.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Resumo dos Produtos */}
                        <div className="p-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Package className="text-gray-600" size={20} />
                                    <span className="text-sm font-medium text-gray-600">Total de itens:</span>
                                </div>
                                <span className="text-lg font-bold text-gray-900">
                                    {produtosCotacao.reduce((acc, item) => acc + item.quantidade, 0).toLocaleString('pt-BR', { minimumFractionDigits: 1 })} unidades
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="p-12 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-gray-100 rounded-full">
                                <ShoppingCart className="text-gray-400" size={48} />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhum produto adicionado
                        </h3>
                        <p className="text-gray-600">
                            Adicione produtos a esta cotação para começar a receber propostas
                        </p>
                    </div>
                )}
            </div>

            {/* Seção de Propostas de Fornecedores */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Building2 className="text-purple-600" size={28} />
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">Propostas de Fornecedores</h2>
                                <p className="text-gray-600 text-sm mt-1">
                                    {propostas.length} {propostas.length === 1 ? 'proposta recebida' : 'propostas recebidas'}
                                </p>
                            </div>
                        </div>
                        {cotacao.status === 'ABERTA' && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                                <CheckCircle className="text-green-600" size={18} />
                                <span className="text-sm font-medium text-green-700">Aceitando propostas</span>
                            </div>
                        )}
                    </div>
                </div>

                {propostas.length > 0 ? (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {propostas.map((proposta) => (
                                <div 
                                    key={proposta.id} 
                                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-gray-50"
                                >
                                    {/* Header do Card da Proposta */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <Building2 className="text-purple-600" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{proposta.fornecedorNome}</h3>
                                                <p className="text-sm text-gray-600 font-mono">{proposta.fornecedorCNPJ}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            proposta.status === 'ACEITA' 
                                                ? 'bg-green-100 text-green-800'
                                                : proposta.status === 'RECUSADA'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-amber-100 text-amber-800'
                                        }`}>
                                            {proposta.status}
                                        </span>
                                    </div>

                                    {/* Informações da Proposta */}
                                    <div className="space-y-3">
                                        {/* Valor Total */}
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="text-green-600" size={20} />
                                                <span className="text-sm text-gray-600">Valor Total</span>
                                            </div>
                                            <span className="text-lg font-bold text-green-600">
                                                R$ {proposta.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>

                                        {/* Prazo de Entrega */}
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Clock className="text-blue-600" size={20} />
                                                <span className="text-sm text-gray-600">Prazo de Entrega</span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">
                                                {proposta.prazoEntrega} dias
                                            </span>
                                        </div>

                                        {/* Data de Envio */}
                                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="text-purple-600" size={20} />
                                                <span className="text-sm text-gray-600">Data de Envio</span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">
                                                {new Date(proposta.dataEnvio).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>

                                        {/* Observações */}
                                        {proposta.observacoes && (
                                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                                <div className="flex items-start gap-2">
                                                    <AlertCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={16} />
                                                    <div>
                                                        <p className="text-xs font-medium text-amber-800 mb-1">Observações</p>
                                                        <p className="text-sm text-amber-700">{proposta.observacoes}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Ações (será implementado depois) */}
                                    <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                            Ver Detalhes
                                        </button>
                                        {proposta.status === 'PENDENTE' && (
                                            <>
                                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                                                    Aceitar
                                                </button>
                                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                                                    Recusar
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-gray-100 rounded-full">
                                <Building2 className="text-gray-400" size={48} />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhuma proposta recebida
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {cotacao.status === 'ABERTA' 
                                ? 'Aguardando propostas dos fornecedores'
                                : 'Esta cotação foi encerrada sem propostas'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}