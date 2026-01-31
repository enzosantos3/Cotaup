import { produtoService } from '@/services/produtoService';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, Tag, Barcode, Box } from 'lucide-react';

export default async function ProdutoDetalhePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params; // Por algum motivo a partir do NextJS 15 só funciona desta forma, por favor não remova
    
    let produto;
    
    try {
        produto = await produtoService.getProdutoById(Number(resolvedParams.id));
    } catch (error) {
        console.error('Erro ao carregar produto:', error);
        notFound(); // Retorna 404 automaticamente
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link
                    href="/fornecedor/produtos"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar para Produtos
                </Link>
                <Link
                    href={`/fornecedor/produtos/edit/${produto.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Editar Produto
                </Link>
            </div>

            {/* Card Principal */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Header do Card */}
                <div className="bg-gradient from-blue-600 to-blue-700 px-6 py-8">
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Package className="text-white" size={48} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-black mb-2">
                                {String(produto.nome)}
                            </h1>
                            <p className="text-gray-700 text-lg">
                                {String(produto.marca)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Categoria */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Tag className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Categoria</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {String(produto.categoria)}
                                </p>
                            </div>
                        </div>

                        {/* Unidade */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Box className="text-green-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Unidade</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {String(produto.unidade)}
                                </p>
                            </div>
                        </div>

                        {/* Código EAN */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <Barcode className="text-purple-600" size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-1">Código de Barras (EAN)</p>
                                <p className="text-2xl font-mono font-bold text-gray-900 tracking-wider">
                                    {String(produto.codigoEAN)}
                                </p>
                            </div>
                        </div>

                        {/* Quantidade */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <Package className="text-orange-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Quantidade</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {produto.quantidade}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informações Adicionais */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Informações do Sistema
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">ID do Produto:</span>
                        <span className="ml-2 font-mono font-semibold text-gray-900">
                            #{produto.id}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        
        const produto = await produtoService.getProdutoById(Number(resolvedParams.id));
        
        return {
            title: `${produto.nome} - ${produto.marca} | CotaUp`,
            description: `Detalhes do produto ${produto.nome} - ${produto.categoria}`,
        };
    } catch (error) {
        return {
            title: 'Produto não encontrado',
        };
    }
}



