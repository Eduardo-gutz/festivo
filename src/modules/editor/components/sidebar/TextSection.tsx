'use client';

import { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import { Type } from 'lucide-react';
import { useElementActions } from '@/modules/editor/hooks/useElementActions';

const TextSection = () => {
  const {
    addTitle,
    addSubtitle,
    addDate,
    addLocation,
  } = useElementActions();
  const { addText, selectedId, updateElement, elements } = useEditor();
  const [newText, setNewText] = useState('');

  const selectedElement = elements.find(el => el.id === selectedId && el.type === 'text'); 9

  const handleAddText = () => {
    if (newText.trim()) {
      addText(newText);
      setNewText('');
    } else {
      addText(); // Usa el texto por defecto
    }
  };

  const toggleBold = () => {
    if (selectedElement) {
      const currentStyle = selectedElement.fontStyle || 'normal';
      const newStyle = currentStyle === 'bold' ? 'normal' : 'bold';
      updateElement(selectedId, { fontStyle: newStyle });
    }
  };

  const toggleItalic = () => {
    if (selectedElement) {
      const currentFamily = selectedElement.fontFamily || 'Arial';
      const isItalic = currentFamily.includes('italic');
      const newFamily = isItalic
        ? currentFamily.replace(' italic', '')
        : currentFamily + ' italic';
      updateElement(selectedId, { fontFamily: newFamily });
    }
  };

  const toggleUnderline = () => {
    if (selectedElement) {
      const currentDecoration = selectedElement.textDecoration || '';
      const newDecoration = currentDecoration === 'underline' ? '' : 'underline';
      updateElement(selectedId, { textDecoration: newDecoration });
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Type className="w-4 h-4 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Texto</h2>
      </div>
      
      <button 
        className="w-full bg-violet-500 text-white py-2 px-4 rounded-lg mb-3 flex items-center justify-center gap-2 hover:bg-violet-600 transition-colors"
        onClick={handleAddText}
      >
        <Type size={18} />
        <span>Agregar un texto</span>
      </button>
    </div>
  );
};

export default TextSection;