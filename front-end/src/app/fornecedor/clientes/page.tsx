import { clienteService } from "@/services/clienteService";
import { ClienteDTO } from "@/types/cliente";
import Link from "next/link";
import { Building2, Eye } from "lucide-react";

export default async function ClientesPage() {
    const clientes = await clienteService.getAllClientes();
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
                    <p className="text-gray-600 mt-1">
                        {clientes.length} {clientes.length === 1 ? 'cliente cadastrado' : 'clientes cadastrados'}
                    </p>
                </div>
            </div>

            {clientes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {clientes.map((cliente) => (
                        <div 
                            key={cliente.id} 
                            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                        >
                            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6">
                                <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mx-auto mb-4">
                                    <Building2 className="text-white" size={32} />
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 text-center mb-3 line-clamp-2 min-h-[56px]">
                                        {cliente.nomeFantasia}
                                    </h3>
                                    
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                        <span className="font-medium">CNPJ:</span>
                                        <span className="font-mono">{cliente.cnpj}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/fornecedor/clientes/detalhes/${cliente.id}`}
                                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm group-hover:shadow-md"
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
                            Nenhum cliente encontrado
                        </h3>
                        <p className="text-gray-600">
                            Os clientes são empresas compradoras que utilizam a plataforma
                        </p>
                    </div>
                </div>
            )}
    
        </div>
    );
}
