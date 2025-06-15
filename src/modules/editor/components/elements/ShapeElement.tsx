import React from 'react';
import { Rect, Circle, Line } from 'react-konva';
import { CanvasElement } from '@/modules/editor/types/canvas.interface';

interface ShapeElementProps {
  element: CanvasElement;
  onElementClick: (e: any, id: string) => void;
  onElementUpdate: (id: string, updates: Partial<CanvasElement>) => void;
}

const ShapeElement: React.FC<ShapeElementProps> = ({ 
  element, 
  onElementClick, 
  onElementUpdate 
}) => {
  const commonProps = {
    id: element.id,
    x: element.x,
    y: element.y,
    fill: element.fill || '#333333',
    stroke: element.stroke,
    strokeWidth: element.strokeWidth || 0,
    opacity: element.opacity,
    draggable: true,
    onClick: (e: any) => onElementClick(e, element.id),
    onDragEnd: (e: any) => {
      onElementUpdate(element.id, {
        x: e.target.x(),
        y: e.target.y(),
      });
    },
    onTransformEnd: (e: any) => {
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
    }
  };

  switch (element.shapeType) {
    case 'rect':
      return (
        <Rect
          {...commonProps}
          width={element.width || 100}
          height={element.height || 100}
          cornerRadius={element.cornerRadius || 0}
        />
      );
    
    case 'circle':
      return (
        <Circle
          {...commonProps}
          radius={element.width ? element.width / 2 : 50}
        />
      );
    
    case 'line':
      return (
        <Line
          {...commonProps}
          points={[0, 0, element.width || 100, element.height || 0]}
          stroke={element.stroke || '#333333'}
          strokeWidth={element.strokeWidth || 2}
          fill=""
        />
      );
    
    default:
      return null;
  }
};

export default ShapeElement; 