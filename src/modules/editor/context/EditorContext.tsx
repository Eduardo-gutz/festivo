'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CanvasElement } from '@/modules/editor/types/canvas.interface';

interface EditorContextType {
  elements: CanvasElement[];
  selectedId: string;
  setElements: (elements: CanvasElement[]) => void;
  setSelectedId: (id: string) => void;
  addText: (text?: string) => void;
  addImage: (imageSrc: string) => void;
  addShape: (shapeType: 'rect' | 'circle' | 'line') => void;
  addTextPath: (text: string, pathData: string) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  exportImage: () => void;
  stageRef: React.RefObject<any> | null;
  setStageRef: (ref: React.RefObject<any>) => void;
  updateElementOrder: (fromIndex: number, toIndex: number) => void;
}

interface EditorProviderProps {
  children: ReactNode;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: 'background',
      type: 'background',
      x: 0,
      y: 0,
      width: 400,
      height: 500,
      fill: '#ffffff',
      visible: true
    }
  ]);
  
  const [selectedId, setSelectedId] = useState<string>('');
  const [stageRef, setStageRef] = useState<React.RefObject<any> | null>(null);

  const addText = (text: string = '¡Estás invitado!') => {
    const newText: CanvasElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: 50,
      y: 50,
      text,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#333333',
      fontStyle: 'normal',
      textDecoration: '',
      visible: true
    };
    setElements([...elements, newText]);
  };

  const addImage = (imageSrc: string) => {
    const imageObj = new window.Image();
    imageObj.crossOrigin = 'anonymous';
    
    imageObj.onload = () => {
      const newImage: CanvasElement = {
        id: `image-${Date.now()}`,
        type: 'image',
        x: 100,
        y: 100,
        width: 150,
        height: 150,
        image: imageObj,
        visible: true
      };
      setElements([...elements, newImage]);
    };
    
    imageObj.onerror = () => {
      console.error('Error cargando imagen:', imageSrc);
    };
    
    imageObj.src = imageSrc;
  };

  const addShape = (shapeType: 'rect' | 'circle' | 'line') => {
    const newShape: CanvasElement = {
      id: `shape-${Date.now()}`,
      type: 'shape',
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      shapeType,
      fill: '#3b82f6',
      stroke: '#1e40af',
      strokeWidth: 2,
      visible: true
    };
    setElements([...elements, newShape]);
  };

  const addTextPath = (text: string, pathData: string) => {
    const newTextPath: CanvasElement = {
      id: `textpath-${Date.now()}`,
      type: 'textPath',
      x: 100,
      y: 100,
      text,
      pathData,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#333333',
      visible: true
    };
    setElements([...elements, newTextPath]);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const deleteElement = (id: string) => {
    if (id !== 'background') {
      setElements(elements.filter(el => el.id !== id));
      setSelectedId('');
    }
  };

  const updateElementOrder = (fromIndex: number, toIndex: number) => {
    const elementsCopy = [...elements];
    const [movedElement] = elementsCopy.splice(fromIndex, 1);
    elementsCopy.splice(toIndex, 0, movedElement);
    setElements(elementsCopy);
  };

  const exportImage = () => {
    if (stageRef?.current) {
      const dataURL = stageRef.current.toDataURL({
        mimeType: 'image/png',
        quality: 1,
        pixelRatio: 2
      });
      
      // Crear enlace de descarga
      const link = document.createElement('a');
      link.download = 'invitacion.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const value: EditorContextType = {
    elements,
    selectedId,
    setElements,
    setSelectedId,
    addText,
    addImage,
    addShape,
    addTextPath,
    updateElement,
    deleteElement,
    exportImage,
    stageRef,
    setStageRef,
    updateElementOrder
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
}; 