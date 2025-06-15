'use client';

import { useEditor } from '../../context/EditorContext';

const MultimediaSection = () => {
  const { exportImage, elements, setElements } = useEditor();

  const createTemplate = (templateType: 'birthday' | 'wedding' | 'party') => {
    const templates = {
      birthday: [
        {
          id: 'background',
          type: 'background' as const,
          x: 0,
          y: 0,
          width: 400,
          height: 500,
          fill: '#ffeb3b'
        },
        {
          id: `text-${Date.now()}`,
          type: 'text' as const,
          x: 50,
          y: 100,
          text: '¡Feliz Cumpleaños!',
          fontSize: 32,
          fontFamily: 'Arial',
          fill: '#e91e63',
          fontStyle: 'bold'
        },
        {
          id: `text-${Date.now() + 1}`,
          type: 'text' as const,
          x: 80,
          y: 200,
          text: 'Estás invitado/a',
          fontSize: 20,
          fontFamily: 'Arial',
          fill: '#333333'
        },
        {
          id: `text-${Date.now() + 2}`,
          type: 'text' as const,
          x: 100,
          y: 350,
          text: 'Fecha: __/__/____',
          fontSize: 16,
          fontFamily: 'Arial',
          fill: '#666666'
        }
      ],
      wedding: [
        {
          id: 'background',
          type: 'background' as const,
          x: 0,
          y: 0,
          width: 400,
          height: 500,
          fill: '#f8f8f8'
        },
        {
          id: `text-${Date.now()}`,
          type: 'text' as const,
          x: 100,
          y: 80,
          text: 'Nos Casamos',
          fontSize: 28,
          fontFamily: 'Georgia',
          fill: '#8e24aa',
          fontStyle: 'normal'
        },
        {
          id: `text-${Date.now() + 1}`,
          type: 'text' as const,
          x: 50,
          y: 200,
          text: 'Te invitamos a celebrar',
          fontSize: 18,
          fontFamily: 'Georgia',
          fill: '#333333'
        },
        {
          id: `text-${Date.now() + 2}`,
          type: 'text' as const,
          x: 80,
          y: 240,
          text: 'nuestro gran día',
          fontSize: 18,
          fontFamily: 'Georgia',
          fill: '#333333'
        }
      ],
      party: [
        {
          id: 'background',
          type: 'background' as const,
          x: 0,
          y: 0,
          width: 400,
          height: 500,
          fill: '#ff5722'
        },
        {
          id: `text-${Date.now()}`,
          type: 'text' as const,
          x: 120,
          y: 100,
          text: '¡FIESTA!',
          fontSize: 36,
          fontFamily: 'Arial',
          fill: '#ffffff',
          fontStyle: 'bold'
        },
        {
          id: `text-${Date.now() + 1}`,
          type: 'text' as const,
          x: 50,
          y: 200,
          text: 'Ven y diviértete',
          fontSize: 22,
          fontFamily: 'Arial',
          fill: '#ffffff'
        }
      ]
    };

    setElements(templates[templateType]);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Multimedia</h2>
        <span className="ml-auto px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
          Premium
        </span>
      </div>

      {/* Botones de Música y Video */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="flex flex-col items-center gap-2 p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors border border-pink-200">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <span className="text-sm font-medium text-pink-700">Música</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-200">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-indigo-700">Video</span>
        </button>
      </div>

      {/* Información del proyecto */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-xs text-gray-600 space-y-1">
          <p>Elementos: {elements.filter(el => el.type !== 'background').length}</p>
          <p>Tamaño: 400×500px</p>
        </div>
      </div>
    </div>
  );
};

export default MultimediaSection;