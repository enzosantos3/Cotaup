import { fornecedorService } from "@/services/fornecedorService";
import { FornecedorDTO } from "@/types/fornecedor";
import Link from "next/link";
import { Plus, Building2, Eye, AlertCircle } from "lucide-react";

export default async function FornecedoresPage() {
    let fornecedores: FornecedorDTO[] = [];
    let error = false;

    try {
        fornecedores = await fornecedorService.getAllFornecedores();
    } catch (err) {
        error = true;
        console.error('Erro ao buscar fornecedores:', err);
    }
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
                    {!error && (
                        <p className="text-gray-600 mt-1">
                            {fornecedores.length} {fornecedores.length === 1 ? 'fornecedor cadastrado' : 'fornecedores cadastrados'}
                        </p>
                    )}
                </div>
                {/*
                <Link
                    href="/fornecedores/create"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    Novo Fornecedor
                </Link>
                */}
            </div>

            {/* Mensagem de erro */}
            {error ? (
                <div className="bg-white rounded-lg border border-red-200 p-12">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-red-50 rounded-full">
                                <AlertCircle className="text-red-500" size={48} />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Erro ao carregar fornecedores
                        </h3>
                        <p className="text-gray-600">
                            Não foi possível conectar com a API. Tente novamente mais tarde.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Grade de Fornecedores */}
                    {fornecedores.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {fornecedores.map((fornecedor) => (
                        <div 
                            key={fornecedor.id} 
                            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                        >
                            <div className="bg-linear-to-br from-blue-600 to-blue-700 p-6">
                                <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mx-auto mb-4">
                                    <Building2 className="text-white" size={32} />
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 text-center mb-3 line-clamp-2 min-h-14">
                                        {fornecedor.nomeFantasia}
                                    </h3>
                                    
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                        <span className="font-medium">CNPJ:</span>
                                        <span className="font-mono">{fornecedor.cnpj}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/fornecedores/${fornecedor.id}`}
                                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm group-hover:shadow-md"
                                >
                                    <Eye size={18} />
                                    Ver Detalhes
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-gray-100 rounded-full">
                                <Building2 className="text-gray-400" size={48} />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhum fornecedor cadastrado
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Comece adicionando seu primeiro fornecedor
                        </p>
                        {/* RETIRAR APENAS QUANDO FOR IMPLEMENTAR CONVITES DE FORNECEDORES
                        
                        <Link
                            href="/fornecedores/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus size={20} />
                            Novo Fornecedor
                        </Link>
                        
                        */} 
                    </div>
                </div>
            )}
                </>
            )}
    
        </div>
    );
}
