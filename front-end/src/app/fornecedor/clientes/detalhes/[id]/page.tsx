import { clienteService } from '@/services/clienteService';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, FileText, User, MapPin, Phone, Mail, Hash } from 'lucide-react';

export default async function ClienteDetalhePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    let cliente;
    
    try {
        cliente = await clienteService.getClienteById(Number(resolvedParams.id));
    } catch (error) {
        console.error('Erro ao carregar cliente:', error);
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link
                    href="/fornecedor/clientes"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar para Clientes
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 px-6 py-8">
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Building2 className="text-white" size={48} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {cliente.nomeFantasia}
                            </h1>
                            <p className="text-purple-100 text-lg">{cliente.razaoSocial}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <FileText className="text-purple-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">CNPJ</p>
                                <p className="text-lg font-mono font-semibold text-gray-900">
                                    {cliente.cnpj}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Hash className="text-green-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Inscrição Estadual</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {cliente.inscricaoEstadual}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <User className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Responsável</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {cliente.responsavel}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-orange-100 rounded-lg">
                                <MapPin className="text-orange-600" size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-1">Endereço</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {cliente.endereco}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone size={24} className="text-purple-600" />
                    Informações de Contato
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Phone className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Telefone</p>
                            <a 
                                href={`tel:${cliente.telefone}`}
                                className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                {cliente.telefone}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <Mail className="text-green-600" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-600 mb-1">E-mail</p>
                            <a 
                                href={`mailto:${cliente.email}`}
                                className="text-lg font-semibold text-green-600 hover:text-green-700 transition-colors break-all"
                            >
                                {cliente.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações do Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">ID do Cliente:</span>
                        <span className="font-mono font-semibold text-gray-900">#{cliente.id}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Tipo:</span>
                        <span className="font-semibold text-purple-600">Comprador</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const cliente = await clienteService.getClienteById(Number(resolvedParams.id));
        
        return {
            title: `${cliente.nomeFantasia} - ${cliente.razaoSocial} | CotaUp`,
            description: `Detalhes do cliente ${cliente.nomeFantasia} - CNPJ: ${cliente.cnpj}`,
        };
    } catch (error) {
        return {
            title: 'Cliente não encontrado',
        };
    }
}
