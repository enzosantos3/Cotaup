'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
    BarChart3,
    FileText, 
    Package, 
    Building2,
    ShoppingCart,
    Menu,
    X,
    LogOut
} from 'lucide-react';
import { useState } from 'react';
import { authService } from '@/services/authService';

const menuItems = [
    {
        name: 'Dashboard',
        href: '/comprador/dashboard',
        icon: BarChart3,
    },
    {
        name: 'Cotações',
        href: '/comprador/cotacoes',
        icon: FileText,
    },
    {
        name: 'Produtos',
        href: '/comprador/produtos',
        icon: Package,
    },
    {
        name: 'Fornecedores',
        href: '/comprador/fornecedores',
        icon: Building2,
    },
    {
        name: 'Pedidos',
        href: '/comprador/pedidos',
        icon: ShoppingCart,
    },
];

export default function CompradorSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await authService.logout();
        router.push('/login');
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-40
                    w-64 bg-white border-r border-gray-200
                    transform transition-transform duration-200 ease-in-out
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <ShoppingCart className="text-purple-600" size={32} />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">CotaUp</h1>
                                <p className="text-xs text-gray-500">Painel Comprador</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                                
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`
                                                flex items-center gap-3 px-4 py-3 rounded-lg
                                                transition-colors group
                                                ${isActive 
                                                    ? 'bg-purple-50 text-purple-600' 
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                }
                                            `}
                                        >
                                            <Icon 
                                                size={20} 
                                                className={isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'}
                                            />
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors group"
                        >
                            <LogOut size={20} className="group-hover:text-red-600" />
                            <span className="font-medium">Sair</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
