import React from 'react';
import { Image } from 'react-konva';
import { CanvasElement } from '@/modules/editor/types/canvas.interface';

interface ImageElementProps {
  element: CanvasElement;
  onElementClick: (e: any, id: string) => void;
  onElementUpdate: (id: string, updates: Partial<CanvasElement>) => void;
}

const ImageElement: React.FC<ImageElementProps> = ({ 
  element, 
  onElementClick, 
  onElementUpdate 
}) => {
  if (!element.image) return null;

  return (
    <Image
      id={element.id}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      image={element.image}
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
          width: node.width() * node.scaleX(),
          height: node.height() * node.scaleY(),
          rotation: node.rotation(),
        });
        node.scaleX(1);
        node.scaleY(1);
      }}
    />
  );
};

export default ImageElement; 