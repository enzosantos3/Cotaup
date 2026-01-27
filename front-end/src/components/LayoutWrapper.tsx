'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    const publicPages = ['/login', '/register', '/', '/debug-token'];
    const hasCustomLayout = pathname.startsWith('/fornecedor') || pathname.startsWith('/comprador');
    
    if (publicPages.includes(pathname) || hasCustomLayout) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
