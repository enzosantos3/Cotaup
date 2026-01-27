'use client';

import { pedidoService } from "@/services/pedidoService";
import { fornecedorService } from "@/services/fornecedorService";
import { PedidoDTO } from "@/types/pedido";
import { FornecedorDTO } from "@/types/fornecedor";
import { Calendar, Package, Plus, Search, TrendingUp, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function PedidosPage() {
    const [pedidos, setPedidos] = useState<PedidoDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPedidos, setFilteredPedidos] = useState<PedidoDTO[]>([]);
    const [fornecedores, setFornecedores] = useState<Map<number, FornecedorDTO>>(new Map());

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const data = await pedidoService.getAllPedidos();
                setPedidos(data);
                setFilteredPedidos(data);
                
                const fornecedorIds = [...new Set(data.map(pedido => pedido.idFornecedor))];
                const fornecedoresMap = new Map<number, FornecedorDTO>();
                
                await Promise.all(
                    fornecedorIds.map(async (id) => {
                        try {
                            const fornecedor = await fornecedorService.getFornecedorById(id);
                            fornecedoresMap.set(id, fornecedor);
                        } catch (error) {
                            console.warn(`Fornecedor ${id} não encontrado`);
                        }
                    })
                );
                
                setFornecedores(fornecedoresMap);
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
            filtered = pedidos.filter(pedido => {
                const fornecedor = fornecedores.get(pedido.idFornecedor);
                return (
                    pedido.id.toString().includes(searchTerm) ||
                    pedido.idComprador.toString().includes(searchTerm) ||
                    fornecedor?.nomeFantasia.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    fornecedor?.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });
        }

        setFilteredPedidos(filtered);
    }, [searchTerm, pedidos, fornecedores]);

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const stats = useMemo(() => {
        const totalPedidos = pedidos.length;
        const volumeTotal = 0; // Placeholder - adicionar quando tiver valor nos pedidos
        
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        const pedidosEsteMes = pedidos.filter(pedido => {
            const pedidoDate = new Date(pedido.criadoEm);
            return pedidoDate.getMonth() === currentMonth && 
                   pedidoDate.getFullYear() === currentYear;
        }).length;

        return {
            totalPedidos,
            volumeTotal,
            pedidosEsteMes
        };
    }, [pedidos]);

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

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalPedidos}</p>
                            <p className="text-sm text-gray-600">Total de Pedidos</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="text-green-600" size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                R$ {stats.volumeTotal > 0 ? (stats.volumeTotal / 1000).toFixed(0) + 'k' : '0'}
                            </p>
                            <p className="text-sm text-gray-600">Volume Total</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calendar className="text-purple-600" size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stats.pedidosEsteMes}</p>
                            <p className="text-sm text-gray-600">Este Mês</p>
                        </div>
                    </div>
                </div>
            </div>

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
                                            Fornecedor: {fornecedores.get(pedido.idFornecedor)?.nomeFantasia || `ID: ${pedido.idFornecedor}`}
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