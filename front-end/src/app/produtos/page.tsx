import {produtoService} from '@/services/produtoService';
import {ProdutoDTO} from '@/types/produto';
import Link from 'next/link';


export default async function ProdutosPage() {
    const produtos = await produtoService.getAllProdutos();

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-900'>Produtos</h1>
                    <p className='text-gray-600 mt-1'>Gerencie todos os seus produtos</p>
                </div>
                <Link
                    href="/produtos/create"
                    className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                    Novo Produto
                </Link>
            </div>
            
            <table className="w-full">
                <thead className="bg-gray-50 text-gray-500 uppercase text-sm leading-normal">
                    <tr>
                        <th className="px-4 py-3 text-left">Nome</th>
                        <th className="px-4 py-3 text-left">Marca</th>
                        <th className="px-4 py-3 text-left">Categoria</th>
                        <th className="px-4 py-3 text-left">Preço</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                    {produtos.map((produto) => (
                        <tr key={produto.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">{produto.nome}</td>
                            <td className="px-4 py-3">{produto.marca}</td>
                            <td className="px-4 py-3">{produto.categoria}</td>
                            <td className="px-4 py-3">R$ {produto.preco}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}