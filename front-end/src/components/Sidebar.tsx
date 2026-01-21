'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
    FileText, 
    Package, 
    Home, 
    Settings, 
    Menu,
    X, 
    Truck,
    BaggageClaim
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
    {
        name: 'Dashboard',
        href: '/',
        icon: Home,
    },
    {
        name: 'Cotações',
        href: '/cotacoes',
        icon: FileText,
    },
    {
        name: 'Produtos',
        href: '/produtos',
        icon: Package,
    },
    {
        name: 'Fornecedores',
        href: '/fornecedores',
        icon: Truck,
    },
    {
        name: 'Pedidos',
        href: '/pedidos',
        icon: BaggageClaim,
    },
    {
        name: 'Configurações',
        href: '/configuracoes',
        icon: Settings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Botão mobile para abrir/fechar sidebar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay para mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-40
                    w-64 bg-gray-900 text-white
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-800">
                        <div className="flex items-center justify-center gap-3">
                            <Image 
                                src="/CotaUp2.png" 
                                alt="CotaUp Logo" 
                                width={70} 
                                height={70}
                            />
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                            
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg
                                        transition-colors duration-200
                                        ${isActive 
                                            ? 'bg-blue-600 text-white' 
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }
                                    `}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-800">
                        <div className="flex items-center gap-3 px-4 py-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                <span className="text-sm font-bold">U</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Usuário</p>
                                <p className="text-xs text-gray-400">usuario@email.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
