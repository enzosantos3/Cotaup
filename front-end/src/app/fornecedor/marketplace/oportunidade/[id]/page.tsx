'use client';

import { ArrowLeft, Building2, Calendar, Clock, FileText, Mail, MapPin, Package, Phone, User, X, Check } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cotacaoService } from "@/services/cotacaoService";
import { CotacaoDTO } from "@/types/cotacao";
import { ProdutoCotacaoDTO } from "@/types/produtoCotacao";

interface EmpresaInfo {
    id: number;
    nome: string;
    cnpj: string;
    endereco: string;
    cidade: string;
    estado: string;
    telefone: string;
    email: string;
    responsavel: string;
}

interface ItemProposta {
    produtoId: number;
    nomeProduto: string;
    marca: string;
    quantidade: number;
    valorUnitario: string;
}

export default function OportunidadeDetalhesPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);
    
    const [cotacao, setCotacao] = useState<CotacaoDTO | null>(null);
    const [produtos, setProdutos] = useState<ProdutoCotacaoDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    const [itensProposta, setItensProposta] = useState<ItemProposta[]>([]);
    const [prazoEntrega, setPrazoEntrega] = useState('');
    const [condicaoPagamento, setCondicaoPagamento] = useState('');
    const [validadeProposta, setValidadeProposta] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [propostaEnviada, setPropostaEnviada] = useState<any>(null);

    const empresaMock: EmpresaInfo = {
        id: 1,
        nome: "Tech Solutions Ltda",
        cnpj: "12.345.678/0001-90",
        endereco: "Av. Paulista, 1000",
        cidade: "São Paulo",
        estado: "SP",
        telefone: "(11) 3000-0000",
        email: "contato@techsolutions.com.br",
        responsavel: "João Silva"
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cotacaoData, produtosData] = await Promise.all([
                    cotacaoService.getCotacaoById(id),
                    cotacaoService.getProdutosCotacao(id)
                ]);
                
                setCotacao(cotacaoData);
                setProdutos(produtosData);
                
                const itens = produtosData.map(p => ({
                    produtoId: p.id,
                    nomeProduto: p.nomeProduto,
                    marca: p.marca,
                    quantidade: p.quantidade,
                    valorUnitario: ''
                }));
                setItensProposta(itens);
            } catch (error) {
                console.error('Erro ao carregar detalhes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

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

    const handleValorChange = (index: number, valor: string) => {
        const novoValor = valor.replace(/[^0-9,]/g, '');
        const novosItens = [...itensProposta];
        novosItens[index].valorUnitario = novoValor;
        setItensProposta(novosItens);
    };

    const calcularValorTotal = () => {
        return itensProposta.reduce((total, item) => {
            const valor = parseFloat(item.valorUnitario.replace(',', '.')) || 0;
            return total + (valor * item.quantidade);
        }, 0);
    };

    const handleEnviarProposta = async (e: React.FormEvent) => {
        e.preventDefault();
        setEnviando(true);

        const todosPreenchidos = itensProposta.every(item => item.valorUnitario.trim() !== '');
        if (!todosPreenchidos) {
            alert('Por favor, preencha o valor unitário de todos os produtos');
            setEnviando(false);
            return;
        }

        setTimeout(() => {
            const proposta = {
                cotacaoId: id,
                itens: itensProposta,
                prazoEntrega,
                condicaoPagamento,
                validadeProposta,
                observacoes,
                valorTotal: calcularValorTotal(),
                dataEnvio: new Date().toISOString(),
                status: 'PENDENTE'
            };
            
            console.log('Proposta enviada:', proposta);
            
            setPropostaEnviada(proposta);
            setShowModal(false);
            setEnviando(false);
            
            // Resetar formulário
            setPrazoEntrega('');
            setCondicaoPagamento('');
            setValidadeProposta('');
            setObservacoes('');
            const itensResetados = itensProposta.map(item => ({...item, valorUnitario: ''}));
            setItensProposta(itensResetados);
        }, 1500);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Carregando detalhes...</div>
            </div>
        );
    }

    if (!cotacao) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <p className="text-gray-600">Cotação não encontrada.</p>
                <Link href="/fornecedor/marketplace" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                    <ArrowLeft size={20} />
                    Voltar ao Marketplace
                </Link>
            </div>
        );
    }

    const diasRestantes = getDiasRestantes(cotacao.dataFim);

    return (
        <div className="space-y-6">
            <div>
                <Link 
                    href="/fornecedor/marketplace" 
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
                >
                    <ArrowLeft size={20} />
                    Voltar ao Marketplace
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{cotacao.nome}</h1>
                        <p className="text-gray-600 mt-1">Cotação #{cotacao.id.toString().padStart(3, '0')}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getBadgeColor(diasRestantes)}`}>
                        {diasRestantes > 0 
                            ? `Encerra em ${diasRestantes} ${diasRestantes === 1 ? 'dia' : 'dias'}`
                            : 'Encerrada'
                        }
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Detalhes da Cotação</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Calendar className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Data de Início</p>
                                    <p className="font-medium">{new Date(cotacao.dataInicio).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <Clock className="text-red-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Data de Encerramento</p>
                                    <p className="font-medium">{new Date(cotacao.dataFim).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <FileText className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="font-medium">{cotacao.status}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-gray-700">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Package className="text-purple-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total de Produtos</p>
                                    <p className="font-medium">{produtos.length} itens</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Produtos Solicitados</h2>
                        
                        {produtos.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Nenhum produto cadastrado nesta cotação.</p>
                        ) : (
                            <div className="space-y-3">
                                {produtos.map((produto, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Package className="text-blue-600" size={20} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{produto.nomeProduto}</p>
                                                <p className="text-sm text-gray-500">{produto.marca}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Quantidade</p>
                                            <p className="font-medium text-gray-900">{produto.quantidade}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Informações da Empresa</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Building2 className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Razão Social</p>
                                    <p className="font-medium text-gray-900">{empresaMock.nome}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <p className="text-sm text-gray-500 mb-1">CNPJ</p>
                                <p className="font-medium text-gray-900">{empresaMock.cnpj}</p>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="text-gray-400 mt-1" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">Endereço</p>
                                    <p className="font-medium text-gray-900">{empresaMock.endereco}</p>
                                    <p className="text-sm text-gray-600">{empresaMock.cidade} - {empresaMock.estado}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="text-gray-400 mt-1" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">Telefone</p>
                                    <p className="font-medium text-gray-900">{empresaMock.telefone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="text-gray-400 mt-1" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">E-mail</p>
                                    <p className="font-medium text-gray-900 break-all">{empresaMock.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <User className="text-gray-400 mt-1" size={18} />
                                <div>
                                    <p className="text-sm text-gray-500">Responsável</p>
                                    <p className="font-medium text-gray-900">{empresaMock.responsavel}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setShowModal(true)}
                        disabled={propostaEnviada !== null}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                            propostaEnviada 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        <FileText size={20} />
                        {propostaEnviada ? 'Proposta Enviada' : 'Criar Proposta'}
                    </button>
                </div>
            </div>

            {propostaEnviada && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Sua Proposta</h2>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                            {propostaEnviada.status}
                        </span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Produtos e Valores</h3>
                            <div className="space-y-2">
                                {propostaEnviada.itens.map((item: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{item.nomeProduto}</p>
                                            <p className="text-sm text-gray-500">{item.marca} - Qtd: {item.quantidade}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Valor Unitário</p>
                                            <p className="font-semibold text-gray-900">R$ {item.valorUnitario}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                            <div>
                                <p className="text-sm text-gray-500">Prazo de Entrega</p>
                                <p className="font-semibold text-gray-900">{propostaEnviada.prazoEntrega} dias</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Condição de Pagamento</p>
                                <p className="font-semibold text-gray-900 capitalize">{propostaEnviada.condicaoPagamento}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Validade da Proposta</p>
                                <p className="font-semibold text-gray-900">{propostaEnviada.validadeProposta} dias</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Data de Envio</p>
                                <p className="font-semibold text-gray-900">
                                    {new Date(propostaEnviada.dataEnvio).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                        </div>

                        {propostaEnviada.observacoes && (
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-1">Observações</p>
                                <p className="text-gray-900">{propostaEnviada.observacoes}</p>
                            </div>
                        )}

                        <div className="pt-4 border-t border-gray-200 bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-gray-900">Valor Total da Proposta:</span>
                                <span className="text-2xl font-bold text-blue-600">
                                    R$ {propostaEnviada.valorTotal.toFixed(2).replace('.', ',')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Criar Proposta</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleEnviarProposta} className="p-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Produtos e Valores</h3>
                                <div className="space-y-3">
                                    {itensProposta.map((item, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="font-medium text-gray-900">{item.nomeProduto}</p>
                                                    <p className="text-sm text-gray-500">{item.marca}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">Quantidade</p>
                                                    <p className="font-medium text-gray-900">{item.quantidade}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Valor Unitário (R$) *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.valorUnitario}
                                                    onChange={(e) => handleValorChange(index, e.target.value)}
                                                    placeholder="0,00"
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                                                />
                                                {item.valorUnitario && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Subtotal: R$ {(parseFloat(item.valorUnitario.replace(',', '.')) * item.quantidade).toFixed(2).replace('.', ',')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-gray-900">Valor Total da Proposta:</span>
                                        <span className="text-2xl font-bold text-blue-600">
                                            R$ {calcularValorTotal().toFixed(2).replace('.', ',')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Prazo de Entrega (dias) *
                                </label>
                                <input
                                    type="number"
                                    value={prazoEntrega}
                                    onChange={(e) => setPrazoEntrega(e.target.value)}
                                    placeholder="Ex: 30"
                                    required
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Condição de Pagamento *
                                </label>
                                <select
                                    value={condicaoPagamento}
                                    onChange={(e) => setCondicaoPagamento(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="avista">À vista</option>
                                    <option value="30dias">30 dias</option>
                                    <option value="60dias">60 dias</option>
                                    <option value="90dias">90 dias</option>
                                    <option value="parcelado">Parcelado</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Validade da Proposta (dias) *
                                </label>
                                <input
                                    type="number"
                                    value={validadeProposta}
                                    onChange={(e) => setValidadeProposta(e.target.value)}
                                    placeholder="Ex: 15"
                                    required
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Observações
                                </label>
                                <textarea
                                    value={observacoes}
                                    onChange={(e) => setObservacoes(e.target.value)}
                                    placeholder="Informações adicionais sobre a proposta..."
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none text-gray-900"
                                />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={enviando}
                                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {enviando ? (
                                        <>Enviando...</>
                                    ) : (
                                        <>
                                            <Check size={20} />
                                            Enviar Proposta
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
