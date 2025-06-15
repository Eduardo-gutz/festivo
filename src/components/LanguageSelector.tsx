'use client';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

export default function LanguageSelector() {
  const t = useTranslations('Language');
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (locale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    const newPath = `/${locale}${pathWithoutLocale || ''}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 border border-gray-200" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe size={18} />
        <span className="capitalize">{t(currentLocale)}</span>
        <ChevronDown size={18} />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 overflow-hidden bg-white rounded-md shadow-lg">
          {routing.locales.map((locale: string) => (
            <button
              key={locale}
              className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${locale === currentLocale ? 'bg-gray-50 font-medium' : ''}`}
              onClick={() => changeLanguage(locale)}
            >
              {t(locale)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 