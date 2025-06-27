'use client';
import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/modules/redux/hooks/reduxAppHooks';
import NavUserProfile from './NavUserProfile';
import { useEffect } from 'react';
import { setCredentials } from '@/modules/redux/slices/auth/auth.slice';
import { fetchCurrentUserThunk } from '@/modules/redux/slices/user/thunk/user.thunk';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!!token) {
      dispatch(setCredentials())
    }
  }, [dispatch])

  return (
    <nav className="p-2 shadow-2xl relative">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-1">
          <Image src="/logo.png" alt="Logo" width={32} height={32} unoptimized priority className='mb-2' />
          <Link href="/" className="text-xl font-bold text-primary">Festivo</Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/features" className="text-black hover:text-primary transition-colors">
              {t('features')}
            </Link>
            <Link href="/templates" className="text-black hover:text-primary transition-colors">
              {t('templates')}
            </Link>
            <Link href="/pricing" className="text-black hover:text-primary transition-colors">
              {t('pricing')}
            </Link>
            <Link href="/contact" className="text-black hover:text-primary transition-colors">
              {t('contact')}
            </Link>
          </div>
          <LanguageSelector />
          <div className="hidden md:flex gap-2">
            {isAuthenticated && user ? (
              <NavUserProfile user={user} />
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary/20 transition-colors"
                >
                  {t('login')}
                </Link> 
                <Link
                  href="/signup" 
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
                >
                  {t('signUp')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 