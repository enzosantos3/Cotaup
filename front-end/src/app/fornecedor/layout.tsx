'use client';

import FornecedorSidebar from '@/components/FornecedorSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function FornecedorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute requiredRole="FORNECEDOR">
            <div className="flex min-h-screen bg-gray-100">
                <FornecedorSidebar />
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
