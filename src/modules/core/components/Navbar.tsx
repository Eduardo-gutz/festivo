'use client';
import { useTranslations } from 'next-intl';
import LanguageSelector from './LanguageSelector';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('Navigation');

  return (
    <nav className="p-4 shadow-2xl">
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
          <Link
            href="/signup"
            className="hidden md:block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
          >
            {t('signUp')}
          </Link>
        </div>
      </div>
    </nav>
  );
} 