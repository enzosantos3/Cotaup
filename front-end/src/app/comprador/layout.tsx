'use client';

import CompradorSidebar from '@/components/CompradorSidebar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CompradorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute requiredRole="COMPRADOR">
            <div className="flex min-h-screen bg-gray-100">
                <CompradorSidebar />
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
