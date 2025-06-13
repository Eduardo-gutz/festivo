'use client';
import React from 'react';
import { useEditor } from '../EditorContext';
import { ChevronUp, ChevronDown, Eye, EyeOff, Layers, Settings, Download, Image } from 'lucide-react';

const LayersPanel = () => {
  const { elements, selectedId, setSelectedId, updateElementOrder, updateElement, exportImage, stageRef } = useEditor();

  // Filtrar elementos excluyendo el fondo y ordenarlos según su posición en el array
  // (los últimos elementos del array se muestran encima en Konva)
  const layerElements = [...elements]
    .filter(el => el.id !== 'background')
    .reverse(); // Invertimos para que el primer elemento en la lista sea el que está más arriba en el canvas

  const selectedElement = selectedId ? elements.find(el => el.id === selectedId) : null;

  // Función para guardar la invitación como objeto JSON
  const saveInvitation = () => {
    const invitation = {
      elements: elements,
      background: elements.find(el => el.id === 'background')?.fill || '#ffffff'
    };
    console.log(invitation);
  }

  // Función para guardar la invitación como imagen
  const saveAsImage = () => {
    if (stageRef?.current) {
      // Crear una URL de la imagen
      const dataURL = stageRef.current.toDataURL({
        pixelRatio: 2, // Mayor calidad
        mimeType: 'image/png'
      });
      
      // Crear un enlace temporal para descargar la imagen
      const link = document.createElement('a');
      link.download = `invitacion-festivo-${new Date().getTime()}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  const handleMoveUp = (id: string) => {
    const index = elements.findIndex(el => el.id === id);
    if (index > 1) { // Ignorar el fondo (índice 0) y no mover si ya es el primero
      updateElementOrder(index, index - 1);
    }
  };

  const handleMoveDown = (id: string) => {
    const index = elements.findIndex(el => el.id === id);
    if (index >= 1 && index < elements.length - 1) { // No mover más abajo del último
      updateElementOrder(index, index + 1);
    }
  };

  const handleVisibilityToggle = (id: string, isVisible: boolean) => {
    // Esta función requeriría añadir soporte para visibilidad en el EditorContext
    // Por ahora es un marcador para futura implementación
  };

  const renderPropertiesSection = () => {
    if (!selectedElement) return null;

    if (selectedElement.type === 'text') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto</label>
            <textarea
              value={selectedElement.text || ''}
              onChange={(e) => updateElement(selectedId!, { text: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Escribe tu texto aquí..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño de fuente</label>
            <input
              type="number"
              value={selectedElement.fontSize || 24}
              onChange={(e) => updateElement(selectedId!, { fontSize: parseInt(e.target.value) })}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="8"
              max="72"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              type="color"
              value={selectedElement.fill || '#333333'}
              onChange={(e) => updateElement(selectedId!, { fill: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuente</label>
            <select
              value={selectedElement.fontFamily || 'Arial'}
              onChange={(e) => updateElement(selectedId!, { fontFamily: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
        </div>
      );
    }

    if (selectedElement.type === 'background') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color de fondo</label>
          <input
            type="color"
            value={selectedElement.fill || '#ffffff'}
            onChange={(e) => updateElement(selectedId!, { fill: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>
      );
    }

    return (
      <p className="text-sm text-gray-500">Selecciona un elemento para editarlo</p>
    );
  };

  return (
    <aside className="w-[280px] h-screen bg-white border-l border-gray-200 p-5 pt-6 flex flex-col overflow-y-auto shadow-lg scroll-bar-small">
      {/* Sección de Exportar */}
      <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
        <Download className="w-5 h-5 mr-3 text-gray-600" />
        <h3 className="text-base font-semibold text-gray-800">Exportar</h3>
      </div>
      
      <div className="mb-6 flex flex-col gap-2">
        <button 
          onClick={saveInvitation}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Guardar Invitación
        </button>
        
        <button 
          onClick={saveAsImage}
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
        >
          <Image className="w-4 h-4 mr-2" />
          Guardar como Imagen
        </button>
      </div>
      
      {/* Sección de Capas */}
      <div className="flex items-center mb-6 pb-3 border-b border-gray-100">
        <Layers className="w-5 h-5 mr-3 text-gray-600" />
        <h3 className="text-base font-semibold text-gray-800">Capas</h3>
      </div>
      
      <div className="mb-6">
        {layerElements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-sm text-gray-500 italic mb-2">No hay elementos en el canvas</p>
            <p className="text-xs text-gray-400">Añade elementos para verlos aquí</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {layerElements.map((element) => (
              <li 
                key={element.id}
                className={`flex items-center justify-between p-3 rounded-xl text-sm transition-all duration-200 cursor-pointer ${
                  selectedId === element.id 
                    ? 'bg-purple-100 text-purple-800 shadow-sm' 
                    : 'hover:bg-gray-50 hover:shadow-sm'
                }`}
                onClick={() => setSelectedId(element.id)}
              >
                <div className="flex items-center flex-1 min-w-0">
                  {/* Icono según tipo de elemento */}
                  <span className={`w-6 h-6 flex items-center justify-center mr-3 rounded-lg text-xs font-medium ${
                    selectedId === element.id ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {element.type === 'text' ? 'T' : '🖼️'}
                  </span>
                  
                  {/* Nombre del elemento */}
                  <span className="truncate font-medium">
                    {element.type === 'text' 
                      ? (element.text?.substring(0, 20) || 'Texto') 
                      : `Imagen ${element.id.slice(-4)}`}
                  </span>
                </div>
                
                <div className="flex gap-1 ml-2">
                  {/* Botones para mover arriba/abajo */}
                  <button 
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveUp(element.id);
                    }}
                    title="Mover hacia arriba"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveDown(element.id);
                    }}
                    title="Mover hacia abajo"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  
                  {/* Botón para mostrar/ocultar (funcionalidad futura) */}
                  <button 
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Para futura implementación
                    }}
                    title="Mostrar/ocultar"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        
        {/* Información sobre las capas */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="flex justify-between items-center text-sm text-gray-600">
              <span>Total elementos:</span>
              <span className="font-semibold text-gray-800">{layerElements.length}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Propiedades */}
      {selectedElement && (
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center mb-4 pb-2 border-b border-gray-100">
            <Settings className="w-5 h-5 mr-3 text-gray-600" />
            <h3 className="text-base font-semibold text-gray-800">Propiedades</h3>
          </div>
          
          <div className="space-y-4">
            {renderPropertiesSection()}
          </div>
        </div>
      )}
    </aside>
  );
};

export default LayersPanel; 