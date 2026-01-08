'use client';

import {produtoService} from '@/services/produtoService';
import {ProdutoDTO} from '@/types/produto';
import { Eye, FileText, Pencil, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function ProdutosPage() {
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProdutos, setFilteredProdutos] = useState<ProdutoDTO[]>([]);
    
    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const produtos = await produtoService.getAllProdutos();
                setProdutos(produtos);
                setFilteredProdutos(produtos);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            } finally {
                setLoading(false);   
            }
        };

        fetchProdutos();
    }, []);

    useEffect(() => {
        let filtered = produtos;

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(produto => 
                produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                produto.codigoEAN.toString().includes(searchTerm)
            );
        }

        setFilteredProdutos(filtered);
    }, [searchTerm, produtos]);

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Carregando Produtos...</div>
            </div>
        );
    }


    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-900'>Produtos</h1>
                    <p className='text-gray-600 mt-1'>Gerencie todos os seus produtos</p>
                </div>
                <Link
                    href="/produtos/create"
                    className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                    + Novo Produto
                </Link>
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
                            placeholder="Pesquisar por nome ou código EAN..."
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                        />
                        {searchTerm && (
                            <button
                                type='button'
                                onClick={handleClearSearch}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                            >
                                <X size={20} />
                            </button>
                        )}
                
                    </div>
                </div>
            </div>

            {/* Lista de Produtos */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className='p-6 border-b border-gray-200'>
                    <h2 className="text-xl font-semibold text-gray-900">Todas as Cotações</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className='w-full'>
                        <thead className='bg-gray-50 text-gray-500 uppercase text-sm leading-normal'>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Descrição
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Marca
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Categoria
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cod. EAN
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Unidade Medida
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProdutos.map((produto: ProdutoDTO) => (
                                <tr key={produto.id} className='hover:bg-gray-50 transition-colors'>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <FileText className='text-gray-400 mr-3' size={20} />
                                            <span className='text-sm font-medium text-gray-900'>{produto.id}</span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <span className='text-sm font-medium text-gray-900'>{produto.nome}</span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <span className='text-sm font-medium text-gray-900'>{produto.marca}</span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <span className='text-sm font-medium text-gray-900'>{produto.categoria}</span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <span className='text-sm font-medium text-gray-900'>{produto.codigoEAN}</span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <span className='text-sm font-medium text-gray-900'>{produto.unidade}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/produtos/${produto.id}`}
                                                className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
                                                title="Ver detalhes"
                                            >
                                                <Eye size={18} /> 
                                            </Link>
                                            <Link
                                                href={`/produtos/edit?id=${produto.id}`}
                                                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                                                title="Editar produto"
                                            >
                                                <Pencil size={18} /> 
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                        {filteredProdutos.length === 0 && searchTerm && (
                            <div className='text-center py-12'>
                                <Search className='mx-auto text-gray-400 mb-4' size={40} />
                                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                                    Nenhum produto encontrado.
                                </h3>
                                <p className='text-gray-600 mb-4'>
                                    Nenhum produto corresponde à sua pesquisa "{searchTerm}".
                                </p>
                                <button
                                    onClick={handleClearSearch}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <X size={20}/>
                                    Limpar Pesquisa
                                </button>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}