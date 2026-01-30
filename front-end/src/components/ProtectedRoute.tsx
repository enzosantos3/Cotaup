'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { Role } from '@/types/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: Role;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            setTimeout(() => {
                if (!authService.isAuthenticated()) {
                    console.log('Usuário não autenticado, redirecionando para login');
                    router.push('/login');
                    return;
                }

                const user = authService.getUser();
                if (!user) {
                    console.log('Dados do usuário não encontrados');
                    router.push('/login');
                    return;
                }

                if (user.role !== requiredRole) {
                    console.log(`Acesso negado. Role requerida: ${requiredRole}, Role do usuário: ${user.role}`);
                    
                    if (user.role === 'COMPRADOR') {
                        router.push('/comprador/dashboard');
                    } else if (user.role === 'FORNECEDOR') {
                        router.push('/fornecedor/dashboard');
                    } else {
                        router.push('/login');
                    }
                    return;
                }

                console.log('Usuário autenticado com role correto:', user.role);
                setIsAuthorized(true);
                setIsChecking(false);
            }, 100);
        };

        checkAuth();
    }, [router, requiredRole]);

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verificando acesso...</p>
                </div>
            </div>
        );
    }

    return isAuthorized ? <>{children}</> : null;
}
