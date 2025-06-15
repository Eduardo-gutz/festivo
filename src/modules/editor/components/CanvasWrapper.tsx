'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Importar Canvas dinámicamente para evitar problemas de SSR
const Canvas = dynamic(() => import('./Canvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[520px] w-full max-w-4xl flex-col items-center justify-center rounded-3xl bg-white shadow-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <h2 className="text-lg font-semibold text-primary">Cargando Editor...</h2>
        <p className="text-sm text-gray-600">Preparando el canvas de diseño</p>
      </div>
    </div>
  ),
});

const CanvasWrapper = () => {
  return <Canvas />;
};

export default CanvasWrapper; 