'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { produtoService } from '@/services/produtoService';
import { ProdutoDTO } from '@/types/produto';

export default function CreateProdutoPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [nome, setNome] = useState('');
    const [marca, setMarca] = useState('');
    const [categoria, setCategoria] = useState('');
    const [unidade, setUnidade] = useState('');
    const [codigoEAN, setCodigoEAN] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validações
        if (!nome || !marca || !categoria || !unidade || !codigoEAN) {
            setError('Preencha todos os campos obrigatórios');
            return;
        }

        setLoading(true);

        try {
            const novoProduto: Omit<ProdutoDTO, 'id'> = {
                nome,
                marca,
                categoria,
                unidade,
                codigoEAN: Number(codigoEAN),
            };

            await produtoService.postCriarProduto(novoProduto);
            router.push('/produtos');
        } catch (err) {
            setError('Erro ao criar produto. Tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <button
                    onClick={() => router.push('/produtos')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Novo Produto</h1>
                <p className="text-gray-600 mt-2">Cadastre um novo produto no sistema</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                            Nome do Produto *
                        </label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                            placeholder="Ex: Cimento Portland CP II"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-2">
                            Marca *
                        </label>
                        <input
                            type="text"
                            id="marca"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                            placeholder="Ex: Votoran"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                            Categoria *
                        </label>
                        <input
                            type="text"
                            id="categoria"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                            placeholder="Ex: Materiais de Construção"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="unidadeMedida" className="block text-sm font-medium text-gray-700 mb-2">
                            Unidade de Medida *
                        </label>
                        <input
                            type="text"
                            id="unidade"
                            value={unidade}
                            onChange={(e) => setUnidade(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                            placeholder="Ex: Saco 50kg, Unidade, m³"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="codigoEAN" className="block text-sm font-medium text-gray-700 mb-2">
                            Código EAN *
                        </label>
                        <input
                            type="text"
                            id="codigoEAN"
                            value={codigoEAN}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setCodigoEAN(value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                            placeholder="7891234567890"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => router.push('/produtos')}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                    >
                        {loading ? 'Criando...' : 'Criar Produto'}
                    </button>
                </div>
            </form>
        </div>
    );
}
