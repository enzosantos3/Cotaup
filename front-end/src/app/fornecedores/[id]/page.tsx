import { fornecedorService } from '@/services/fornecedorService';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, FileText, User, MapPin, Phone, Mail, Hash, Pencil } from 'lucide-react';

export default async function FornecedorDetalhePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    let fornecedor;
    
    try {
        fornecedor = await fornecedorService.getFornecedorById(Number(resolvedParams.id));
    } catch (error) {
        console.error('Erro ao carregar fornecedor:', error);
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <Link
                    href="/fornecedores"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar para Fornecedores
                </Link>
                {/*
                <Link
                    href={`/fornecedores/edit/${fornecedor.id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Pencil size={18} />
                    Editar Fornecedor
                </Link>
                */}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-linear-to-br from-blue-600 to-blue-700 px-6 py-8">
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Building2 className="text-white" size={48} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                {fornecedor.nomeFantasia}
                            </h1>
                            <p className="text-blue-100 text-lg">{fornecedor.razaoSocial}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FileText className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">CNPJ</p>
                                <p className="text-lg font-mono font-semibold text-gray-900">
                                    {fornecedor.cnpj}
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
                                    {fornecedor.inscricaoEstadual}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <User className="text-purple-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Representante</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {fornecedor.representante}
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
                                    {fornecedor.endereco}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone size={24} className="text-blue-600" />
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
                                href={`tel:${fornecedor.telefone}`}
                                className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                {fornecedor.telefone}
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
                                href={`mailto:${fornecedor.email}`}
                                className="text-lg font-semibold text-green-600 hover:text-green-700 transition-colors break-all"
                            >
                                {fornecedor.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações do Sistema</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">ID do Fornecedor:</span>
                        <span className="ml-2 font-mono font-semibold text-gray-900">#{fornecedor.id}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contatos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-600">teste</span>
                        <span className="ml-2 font-mono font-semibold text-gray-900">#{fornecedor.id}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const fornecedor = await fornecedorService.getFornecedorById(Number(resolvedParams.id));
        
        return {
            title: `${fornecedor.nomeFantasia} - ${fornecedor.razaoSocial} | CotaUp`,
            description: `Detalhes do fornecedor ${fornecedor.nomeFantasia} - CNPJ: ${fornecedor.cnpj}`,
        };
    } catch (error) {
        return {
            title: 'Fornecedor não encontrado',
        };
    }
}
