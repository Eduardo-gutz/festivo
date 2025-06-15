import React from 'react';
import { TextPath, Path } from 'react-konva';
import { CanvasElement } from '@/modules/editor/types/canvas.interface';

interface TextPathElementProps {
  element: CanvasElement;
  onElementClick: (e: any, id: string) => void;
  onElementUpdate: (id: string, updates: Partial<CanvasElement>) => void;
}

const TextPathElement: React.FC<TextPathElementProps> = ({ 
  element, 
  onElementClick, 
  onElementUpdate 
}) => {
  if (!element.pathData || !element.text) return null;

  return (
    <>
      {/* Renderizar el path invisible para guía */}
      <Path
        id={`${element.id}-path`}
        x={element.x}
        y={element.y}
        data={element.pathData}
        stroke="transparent"
        strokeWidth={1}
      />
      
      {/* Renderizar el texto siguiendo el path */}
      <TextPath
        id={element.id}
        x={element.x}
        y={element.y}
        text={element.text || ''}
        fontSize={element.fontSize || 24}
        fontFamily={element.fontFamily || 'Arial'}
        fill={element.fill || '#333333'}
        fontStyle={element.fontStyle}
        opacity={element.opacity}
        data={element.pathData}
        draggable
        onClick={(e) => onElementClick(e, element.id)}
        onDragEnd={(e) => {
          onElementUpdate(element.id, {
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = e.target;
          onElementUpdate(element.id, {
            x: node.x(),
            y: node.y(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY(),
            rotation: node.rotation(),
          });
        }}
      />
    </>
  );
};

export default TextPathElement; 