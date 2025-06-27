'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton: FC<LogoutButtonProps> = ({ onClick }) => {
  const t = useTranslations('Sidebar');

  return (
    <div className="p-2 border-t border-white/20 sticky bottom-0 left-0 right-0">
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">{t('logout')}</span>
      </button>
    </div>
  );
};

export default LogoutButton; 