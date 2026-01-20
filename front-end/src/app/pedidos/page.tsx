'use client';

import { pedidoService } from "@/services/pedidoService";
import { PedidoDTO } from "@/types/pedido";
import { Package, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PedidosPage() {
    const [pedidos, setPedidos] = useState<PedidoDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPedidos, setFilteredPedidos] = useState<PedidoDTO[]>([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const data = await pedidoService.getAllPedidos();
                setPedidos(data);
                setFilteredPedidos(data);
            } catch (error) {
                console.error('Erro ao carregar pedidos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    useEffect(() => {
        let filtered = pedidos;

        if (searchTerm.trim() !== '') {
            filtered = pedidos.filter(pedido =>
                pedido.id.toString().includes(searchTerm) ||
                pedido.idComprador.toString().includes(searchTerm)
            );
        }

        setFilteredPedidos(filtered);
    }, [searchTerm, pedidos]);

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Carregando Pedidos...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
                    <p className="text-gray-600 mt-1">Gerencie todos os seus Pedidos</p>
                </div>
                <Link
                    href="/pedidos/create"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    Novo Pedido
                </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Pesquisar por nome ou status..."
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-900"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Pedidos List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredPedidos.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <p className="text-gray-500">Nenhum pedido encontrado.</p>
                    </div>
                ) : (
                    filteredPedidos.map((pedido: PedidoDTO) => (
                        <div
                            key={pedido.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Package className="text-blue-600" size={24} />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Pedido #{pedido.id.toString().padStart(3, '0')}
                                            </h3>
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                Entregue
                                            </span>
                                        </div>
                                        
                                        <p className="text-gray-600 text-sm mb-2">
                                            Fornecedor ID: {pedido.idFornecedor}
                                        </p>
                                        
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>Cotação #{pedido.idCotacao}</span>
                                            <span>•</span>
                                            <span>{new Date(pedido.criadoEm).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-2xl font-bold text-blue-600">
                                        R$ 0,00
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );


}