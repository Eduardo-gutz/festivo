'use client';
import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Transformer, Rect } from 'react-konva';
import Konva from 'konva';
import { useEditor } from '../context/EditorContext';
import { ElementRenderer } from './elements';

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  
  const {
    elements,
    selectedId,
    setSelectedId,
    updateElement,
    deleteElement,
    exportImage,
    setStageRef
  } = useEditor();
  
  const stageSize = { width: 430, height: 600 };

  // Establecer la referencia del stage en el contexto
  useEffect(() => {
    setStageRef(stageRef);
  }, [setStageRef]);

  // Manejador de selección
  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId('');
    }
  }

  const handleElementClick = (e: any, id: string) => {
    e.cancelBubble = true;
    setSelectedId(id);
  };

  // Actualizar transformer cuando cambia la selección
  useEffect(() => {
    if (selectedId && transformerRef.current && stageRef.current) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode && selectedNode.getClassName() !== 'Group') {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  const isEmpty = elements.filter(el => el.type !== 'background').length === 0;

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto h-full flex items-center justify-center">
          <div className="bg-white rounded-4xl shadow-2xl">
            {isEmpty ? (
              <div className="w-[400px] h-[500px] rounded-lg flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Crea tu invitación</h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm">
                  Selecciona una plantilla o comienza desde cero para crear tu invitación perfecta
                </p>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-4xl overflow-hidden">
                <Stage
                  ref={stageRef}
                  width={stageSize.width}
                  height={stageSize.height}
                  onMouseDown={handleStageClick}
                  onTouchStart={handleStageClick}
                >
                  <Layer ref={layerRef}>
                    {/* Fondo */}
                    <Rect
                      id="background"
                      x={0}
                      y={0}
                      width={stageSize.width}
                      height={stageSize.height}
                      fill={elements.find(el => el.id === 'background')?.fill || '#ffffff'}
                      onClick={(e) => handleElementClick(e, 'background')}
                    />

                    {/* Renderizar elementos */}
                    {elements
                      .filter(el => el.type !== 'background')
                      .map((element) => (
                        <ElementRenderer
                          key={element.id}
                          element={element}
                          onElementClick={handleElementClick}
                          onElementUpdate={updateElement}
                        />
                      ))}

                    {/* Transformer para elementos seleccionados */}
                    <Transformer
                      ref={transformerRef}
                      boundBoxFunc={(oldBox, newBox) => {
                        // Limitar el tamaño mínimo
                        if (newBox.width < 20 || newBox.height < 20) {
                          return oldBox;
                        }
                        return newBox;
                      }}
                    />
                  </Layer>
                </Stage>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;