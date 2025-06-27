'use client'
import { useTranslations } from 'next-intl';

const HelpPage = () => {
  const t = useTranslations('Sidebar');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t('help')}
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Aquí encontrarás ayuda y documentación sobre cómo usar la aplicación.
        </p>
      </div>
    </div>
  );
};

export default HelpPage; 