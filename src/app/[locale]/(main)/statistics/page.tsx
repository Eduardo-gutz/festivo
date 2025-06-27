'use client'
import { useTranslations } from 'next-intl';

const StatisticsPage = () => {
  const t = useTranslations('Sidebar');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t('statistics')}
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Aquí podrás ver las estadísticas de tus eventos.
        </p>
      </div>
    </div>
  );
};

export default StatisticsPage; 