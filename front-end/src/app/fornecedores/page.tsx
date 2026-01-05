import { fornecedorService } from "@/services/fornecedorService";
import { FornecedorDTO } from "@/types/fornecedor";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function FornecedoresPage() {
    const fornecedores = await fornecedorService.getAllFornecedores();
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
                    <p className="text-gray-600 mt-1">Gerencie todos os seus fornecedores</p>
                </div>
            </div>

            {/* Lista de Fornecedores */}
            {/* <table className="w-full">
                <thead className="bg-gray-50 text-gray-500 uppercase text-sm leading-normal">
                    <tr>
                        <th className="px-4 py-3 text-left">Nome</th>
                        <th className="px-4 py-3 text-left">CNPJ</th>
                        <th className="px-4 py-3 text-left">Telefone</th>
                        <th className="px-4 py-3 text-left">Email</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                    {fornecedores.map((fornecedor) => (
                        <tr key={fornecedor.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">{fornecedor.nomeFantasia}</td>
                            <td className="px-4 py-3">{fornecedor.cnpj}</td>
                            <td className="px-4 py-3">{fornecedor.telefone}</td>
                            <td className="px-4 py-3">{fornecedor.email}</td>
                        </tr>
                    ))}
                </tbody>
             </table>
            */}

            {/* Grade de Fornecedores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {fornecedores.map((fornecedor) => (
                    <div key={fornecedor.id} className="border rounded-lg p-4 text-gray-500 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <h2 className="text-lg font-semibold mb-2">{fornecedor.nomeFantasia}</h2>
                    <p><span className="font-medium">CNPJ:</span> {fornecedor.cnpj}</p>
                    <p><span className="font-medium">Telefone:</span> {fornecedor.telefone}</p>
                    <p><span className="font-medium">Email:</span> {fornecedor.email}</p>
                    </div>
                ))}
            </div>
    
        </div>
    );
}
