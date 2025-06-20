'use client'
import { useAppDispatch } from '@/modules/redux/hooks/reduxAppHooks';
import { logout, setCredentials } from '@/modules/redux/slices/auth/auth.slice';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface LayoutProps {
    children: ReactNode;
    params: {
        locale: string;
    };
}

export default function Layout({ children }: LayoutProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem('token');
        if (!authToken) {
          dispatch(logout());
          router.push(`/login`);
        }
      }, []);
    
    return (
        <div>
            {children}
        </div>
    );
}
