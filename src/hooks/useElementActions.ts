import { useEditor } from '@/components/editor/EditorContext';

export const useElementActions = () => {
  const { addText, addImage, addShape, addTextPath } = useEditor();

  // Funciones de utilidad para crear elementos predefinidos
  const addRectangle = () => addShape('rect');
  const addCircle = () => addShape('circle');
  const addLine = () => addShape('line');
  
  const addCurvedText = (text: string = 'Texto curvo') => {
    // Path simple para texto curvo
    const curvePath = 'M 50 100 Q 150 50 250 100';
    addTextPath(text, curvePath);
  };

  const addTitle = () => addText('Título Principal');
  const addSubtitle = () => addText('Subtítulo');
  const addDate = () => addText('Fecha y Hora');
  const addLocation = () => addText('Ubicación del Evento');

  return {
    // Funciones básicas
    addText,
    addImage,
    addShape,
    addTextPath,
    
    // Funciones de utilidad para formas
    addRectangle,
    addCircle,
    addLine,
    
    // Funciones de utilidad para texto
    addTitle,
    addSubtitle,
    addDate,
    addLocation,
    addCurvedText,
  };
}; 