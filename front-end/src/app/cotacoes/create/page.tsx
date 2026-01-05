'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Package, Plus, Trash2, X, FileText, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';
import { cotacaoService } from '@/services/cotacaoService';
import { produtoService } from '@/services/produtoService';
import { CotacaoDTO, CotacaoStatus } from '@/types/cotacao';
import { ProdutoDTO } from '@/types/produto';

// Registrar locale português brasileiro
registerLocale('pt-BR', ptBR);

interface ProdutoCotacao extends ProdutoDTO {
    quantidade: number;
}

export default function CreateCotacaoPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [etapaAtual, setEtapaAtual] = useState(1);
    
    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataFim, setDataFim] = useState<Date | null>(null);

    const [produtosSelecionados, setProdutosSelecionados] = useState<ProdutoCotacao[]>([]);
    const [codigoBarras, setCodigoBarras] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [buscandoProduto, setBuscandoProduto] = useState(false);
    const [produtoEncontrado, setProdutoEncontrado] = useState<ProdutoDTO | null>(null);

    const buscarProdutoPorCodigoBarras = async () => {
        if (!codigoBarras) {
            setError('Digite o código de barras do produto');
            return;
        }

        setBuscandoProduto(true);
        setError('');
        setProdutoEncontrado(null);

        try {
            const produtos = await produtoService.getAllProdutos();
            const produto = produtos.find(p => String(p.codigoEAN) === codigoBarras);
            
            if (produto) {
                setProdutoEncontrado(produto);
            } else {
                setError('Produto não encontrado com este código de barras');
            }
        } catch (err) {
            setError('Erro ao buscar produto. Tente novamente.');
            console.error(err);
        } finally {
            setBuscandoProduto(false);
        }
    };

    const handleAddProdutoFromBarcode = () => {
        if (!produtoEncontrado) return;

        if (produtosSelecionados.find(p => p.id === produtoEncontrado.id)) {
            setError('Este produto já foi adicionado à cotação');
            return;
        }

        if (quantidade <= 0) {
            setError('A quantidade deve ser maior que zero');
            return;
        }

        const produtoCotacao: ProdutoCotacao = {
            ...produtoEncontrado,
            quantidade,
        };

        setProdutosSelecionados([...produtosSelecionados, produtoCotacao]);
        
        setCodigoBarras('');
        setQuantidade(1);
        setProdutoEncontrado(null);
        setError('');
    };

    const handleRemoveProduto = (id: number) => {
        setProdutosSelecionados(produtosSelecionados.filter(p => p.id !== id));
    };

    const handleUpdateQuantidade = (id: number, novaQuantidade: number) => {
        setProdutosSelecionados(
            produtosSelecionados.map(p => 
                p.id === id ? { ...p, quantidade: novaQuantidade } : p
            )
        );
    };

    const validarEtapa1 = () => {
        if (!nome || !dataInicio || !dataFim) {
            setError('Preencha todos os campos obrigatórios');
            return false;
        }
        if (dataFim < dataInicio) {
            setError('A data de término deve ser maior que a data de início');
            return false;
        }
        setError('');
        return true;
    };

    const validarEtapa2 = () => {
        if (produtosSelecionados.length === 0) {
            setError('Adicione pelo menos um produto à cotação');
            return false;
        }
        if (produtosSelecionados.some(p => p.quantidade <= 0)) {
            setError('A quantidade de todos os produtos deve ser maior que zero');
            return false;
        }
        setError('');
        return true;
    };

    const proximaEtapa = () => {
        if (etapaAtual === 1 && validarEtapa1()) {
            setEtapaAtual(2);
        } else if (etapaAtual === 2 && validarEtapa2()) {
            setEtapaAtual(3);
        }
    };

    const etapaAnterior = () => {
        setError('');
        setEtapaAtual(etapaAtual - 1);
    };

    const handleSubmit = async () => {
        setError('');
        setLoading(true);

        try {
            const novaCotacao: Omit<CotacaoDTO, 'id'> = {
                nome,
                dataInicio: dataInicio?.toISOString().split('T')[0] || '',
                dataFim: dataFim?.toISOString().split('T')[0] || '',
                status: CotacaoStatus.ABERTA,
            };

            await cotacaoService.postCriarCotacao(novaCotacao);
            router.push('/cotacoes');
        } catch (err) {
            setError('Erro ao criar cotação. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push('/cotacoes')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Nova Cotação</h1>
                <p className="text-gray-600 mt-2">Siga as etapas para criar uma nova cotação</p>
            </div>

            {/* Indicador de Etapas */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {[1, 2, 3].map((etapa) => (
                        <div key={etapa} className="flex items-center flex-1">
                            <div className="flex flex-col items-center w-full">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                                    etapaAtual > etapa 
                                        ? 'bg-green-600 border-green-600 text-white' 
                                        : etapaAtual === etapa
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-400'
                                }`}>
                                    {etapaAtual > etapa ? <Check size={20} /> : etapa}
                                </div>
                                <span className={`text-xs mt-2 font-medium ${
                                    etapaAtual >= etapa ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                    {etapa === 1 ? 'Informações' : etapa === 2 ? 'Produtos' : 'Revisão'}
                                </span>
                            </div>
                            {etapa < 3 && (
                                <div className={`h-1 flex-1 mx-2 rounded transition-colors ${
                                    etapaAtual > etapa ? 'bg-green-600' : 'bg-gray-200'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
                    <X size={20} />
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Etapa 1*/}
                {etapaAtual === 1 && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FileText className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Informações Gerais</h2>
                                <p className="text-sm text-gray-600">Defina os dados básicos da cotação</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome da Cotação *
                            </label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                placeholder="Ex: Cotação de Materiais de Construção - Janeiro 2026"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data de Início *
                                </label>
                                <div className="relative">
                                    <DatePicker
                                        selected={dataInicio}
                                        onChange={(date: Date | null) => setDataInicio(date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                        placeholderText="Selecione a data de início"
                                        locale="pt-BR"
                                        required
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data de Término *
                                </label>
                                <div className="relative">
                                    <DatePicker
                                        selected={dataFim}
                                        onChange={(date: Date | null) => setDataFim(date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                        placeholderText="Selecione a data de término"
                                        minDate={dataInicio || undefined}
                                        locale="pt-BR"
                                        required
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Etapa 2*/}
                {etapaAtual === 2 && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Package className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Adicionar Produtos</h2>
                                <p className="text-sm text-gray-600">Busque produtos pelo código de barras</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                            <h3 className="font-medium text-gray-900 mb-4">Buscar Produto</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Código de Barras (EAN)
                                    </label>
                                    <input
                                        type="text"
                                        value={codigoBarras}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            setCodigoBarras(value);
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                buscarProdutoPorCodigoBarras();
                                            }
                                        }}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                        placeholder="Digite ou escaneie o código de barras"
                                        inputMode="numeric"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        type="button"
                                        onClick={buscarProdutoPorCodigoBarras}
                                        disabled={buscandoProduto || !codigoBarras}
                                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {buscandoProduto ? 'Buscando...' : 'Buscar'}
                                    </button>
                                </div>
                            </div>

                            {/* Produto Encontrado */}
                            {produtoEncontrado && (
                                <div className="mt-4 p-4 bg-white border border-green-200 rounded-lg">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900 text-lg">{String(produtoEncontrado.nome)}</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                <span className="font-medium">Marca:</span> {String(produtoEncontrado.marca)} • 
                                                <span className="font-medium ml-2">Categoria:</span> {String(produtoEncontrado.categoria)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Unidade:</span> {String(produtoEncontrado.unidade)}
                                            </p>
                                        </div>
                                        <div className="ml-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                            Encontrado
                                        </div>
                                    </div>

                                    <div className="flex items-end gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Quantidade
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantidade}
                                                onChange={(e) => setQuantidade(Number(e.target.value))}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleAddProdutoFromBarcode}
                                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                                        >
                                            <Plus size={20} />
                                            Adicionar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Lista de Produtos Adicionados */}
                        <div>
                            <h3 className="font-medium text-gray-900 mb-4">
                                Produtos Adicionados ({produtosSelecionados.length})
                            </h3>
                            
                            {produtosSelecionados.length === 0 ? (
                                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                                    <Package size={48} className="mx-auto text-gray-400 mb-3" />
                                    <p className="text-gray-500">Nenhum produto adicionado</p>
                                    <p className="text-sm text-gray-400 mt-1">Busque produtos pelo código de barras acima</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Produto</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Marca</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Categoria</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Unidade</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantidade</th>
                                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {produtosSelecionados.map((produto) => (
                                                <tr key={produto.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm text-gray-900">{String(produto.nome)}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{String(produto.marca)}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{String(produto.categoria)}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">{String(produto.unidade)}</td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={produto.quantidade}
                                                            onChange={(e) => handleUpdateQuantidade(produto.id, Number(e.target.value))}
                                                            className="w-20 px-2 py-1 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveProduto(produto.id)}
                                                            className="text-red-600 hover:text-red-800 transition-colors"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Etapa 3: Revisão */}
                {etapaAtual === 3 && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Check className="text-green-600" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Revisão Final</h2>
                                <p className="text-sm text-gray-600">Confira os dados antes de publicar</p>
                            </div>
                        </div>

                        {/* Informações Gerais */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText size={20} />
                                Informações Gerais
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Nome da Cotação</p>
                                    <p className="font-medium text-gray-900">{nome}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Data de Início</p>
                                    <p className="font-medium text-gray-900">
                                        {dataInicio?.toLocaleDateString('pt-BR') || '-'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Data de Término</p>
                                    <p className="font-medium text-gray-900">
                                        {dataFim?.toLocaleDateString('pt-BR') || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Produtos Selecionados */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Package size={20} />
                                Produtos ({produtosSelecionados.length})
                            </h3>
                            <div className="space-y-3">
                                {produtosSelecionados.map((produto) => (
                                    <div key={produto.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                                        <div>
                                            <p className="font-medium text-gray-900">{String(produto.nome)}</p>
                                            <p className="text-sm text-gray-600">
                                                {String(produto.marca)} • {String(produto.categoria)} • {String(produto.unidade)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Quantidade</p>
                                            <p className="font-semibold text-blue-600">{produto.quantidade}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Botões de Navegação */}
            <div className="flex justify-between mt-8">
                <button
                    type="button"
                    onClick={etapaAnterior}
                    disabled={etapaAtual === 1}
                    className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowLeft size={20} />
                    Anterior
                </button>

                {etapaAtual < 3 ? (
                    <button
                        type="button"
                        onClick={proximaEtapa}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Próximo
                        <ArrowRight size={20} />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Publicando...' : 'Publicar Cotação'}
                        <Check size={20} />
                    </button>
                )}
            </div>
        </div>
    );
}
