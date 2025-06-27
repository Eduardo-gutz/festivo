'use client'
import { useAppDispatch } from '@/modules/redux/hooks/reduxAppHooks';
import { logout } from '@/modules/redux/slices/auth/auth.slice';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/modules/core/components/navigation/Sidebar';

interface LayoutProps {
    children: ReactNode;
    params: {
        locale: string;
    };
}

export default function Layout({ children }: LayoutProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          dispatch(logout());
          router.push(`/login`);
        }
      }, []);
    
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            {/* Contenido principal */}
            <div className="flex-1 flex flex-col md:ml-64">
                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
