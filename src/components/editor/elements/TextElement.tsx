import React from 'react';
import { Text } from 'react-konva';
import { CanvasElement } from '@/interfaces/canvas.interface';

interface TextElementProps {
  element: CanvasElement;
  onElementClick: (e: any, id: string) => void;
  onElementUpdate: (id: string, updates: Partial<CanvasElement>) => void;
}

const TextElement: React.FC<TextElementProps> = ({ 
  element, 
  onElementClick, 
  onElementUpdate 
}) => {
  return (
    <Text
      id={element.id}
      x={element.x}
      y={element.y}
      text={element.text || ''}
      fontSize={element.fontSize || 24}
      fontFamily={element.fontFamily || 'Arial'}
      fill={element.fill || '#333333'}
      fontStyle={element.fontStyle}
      textDecoration={element.textDecoration}
      opacity={element.opacity}
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
  );
};

export default TextElement; 