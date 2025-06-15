export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'background' | 'shape' | 'textPath';
  x: number;
  y: number;
  width?: number;
  height?: number;
  
  // Text properties
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  textDecoration?: string;
  
  // Image properties
  image?: HTMLImageElement;
  
  // Shape properties
  shapeType?: 'rect' | 'circle' | 'line' | 'polygon';
  cornerRadius?: number;
  strokeWidth?: number;
  stroke?: string;
  
  // TextPath properties
  pathData?: string;
  pathOffset?: number;
  
  // Common properties
  fill?: string;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  visible?: boolean;
  opacity?: number;
}
