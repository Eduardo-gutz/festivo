'use client'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/modules/redux/hooks/reduxAppHooks';
import { fetchCurrentUserThunk } from '@/modules/redux/slices/user/thunk/user.thunk';
import { useTranslations } from 'next-intl';

const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const t = useTranslations('Sidebar');

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUserThunk());
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t('dashboard')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjetas de resumen */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Invitaciones Enviadas
          </h3>
          <p className="text-3xl font-bold text-primary">12</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Invitados Confirmados
          </h3>
          <p className="text-3xl font-bold text-success">8</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Eventos Activos
          </h3>
          <p className="text-3xl font-bold text-secondary">3</p>
        </div>
      </div>
      
      {/* Bienvenida */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ¡Bienvenido{user?.full_name ? `, ${user.full_name}` : ''}!
        </h2>
        <p className="text-gray-600">
          Desde aquí puedes gestionar tus invitaciones, invitados y eventos. 
          Utiliza el menú lateral para navegar entre las diferentes secciones.
        </p>
      </div>
    </div>
  )
}

export default DashboardPage