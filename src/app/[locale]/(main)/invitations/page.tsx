'use client'
import { useTranslations } from 'next-intl';

const InvitationsPage = () => {
  const t = useTranslations('Sidebar');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t('invitations')}
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Aquí podrás gestionar todas tus invitaciones.
        </p>
      </div>
    </div>
  );
};

export default InvitationsPage; 