import React from 'react';
import { CanvasElement } from '@/modules/editor/types/canvas.interface';
import TextElement from './TextElement';
import ImageElement from './ImageElement';
import ShapeElement from './ShapeElement';
import TextPathElement from './TextPathElement';

interface ElementRendererProps {
  element: CanvasElement;
  onElementClick: (e: any, id: string) => void;
  onElementUpdate: (id: string, updates: Partial<CanvasElement>) => void;
}

// Mapa de renderizadores para cada tipo de elemento
const elementRenderers = {
  text: TextElement,
  image: ImageElement,
  shape: ShapeElement,
  textPath: TextPathElement,
} as const;

const ElementRenderer: React.FC<ElementRendererProps> = ({ 
  element, 
  onElementClick, 
  onElementUpdate 
}) => {
  // Filtrar elementos de background que se renderizan por separado
  if (element.type === 'background') {
    return null;
  }

  // Obtener el componente renderizador basado en el tipo
  const RendererComponent = elementRenderers[element.type as keyof typeof elementRenderers];
  
  // Si no hay renderizador para este tipo, no renderizar nada
  if (!RendererComponent) {
    console.warn(`No renderer found for element type: ${element.type}`);
    return null;
  }

  // Renderizar el elemento usando el componente apropiado
  return (
    <RendererComponent
      element={element}
      onElementClick={onElementClick}
      onElementUpdate={onElementUpdate}
    />
  );
};

export default ElementRenderer; 