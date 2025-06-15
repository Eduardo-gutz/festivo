'use client';
import React from 'react';
import { useEditor } from './EditorContext';

const PropertiesPanel = () => {
  const { elements, selectedId, updateElement } = useEditor();

  if (!selectedId) return null;

  const selectedElement = elements.find(el => el.id === selectedId);
  if (!selectedElement) return null;

  if (selectedElement.type === 'text') {
    return (
      <div className="w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Propiedades</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto</label>
            <textarea
              value={selectedElement.text || ''}
              onChange={(e) => updateElement(selectedId, { text: e.target.value })}
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
              onChange={(e) => updateElement(selectedId, { fontSize: parseInt(e.target.value) })}
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
              onChange={(e) => updateElement(selectedId, { fill: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuente</label>
            <select
              value={selectedElement.fontFamily || 'Arial'}
              onChange={(e) => updateElement(selectedId, { fontFamily: e.target.value })}
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
      </div>
    );
  }

  if (selectedElement.type === 'background') {
    return (
      <div className="w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Propiedades</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color de fondo</label>
          <input
            type="color"
            value={selectedElement.fill || '#ffffff'}
            onChange={(e) => updateElement(selectedId, { fill: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Propiedades</h3>
      <p className="text-sm text-gray-500">Selecciona un elemento para editarlo</p>
    </div>
  );
};

export default PropertiesPanel; 