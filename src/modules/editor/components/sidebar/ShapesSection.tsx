'use client';

import { Circle, Minus, Square, Star, ArrowUpRight } from 'lucide-react';
import { useElementActions } from '@/modules/editor/hooks/useElementActions';
import IconButton from '@/modules/core/components/IconButton';

const ShapesSection = () => {
  const {
    addRectangle,
    addCircle,
    addLine,
    addCurvedText,
  } = useElementActions();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Square className="w-4 h-4 text-green-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Formas</h2>
      </div>
      <div className="flex gap-2 flex-wrap">
        <IconButton
          icon={<Square />}
          onClick={() => addRectangle()}
        />
        <IconButton
          icon={<Circle />}
          onClick={() => addCircle()}
        />
        <IconButton
          icon={<Minus />}
          onClick={() => addLine()}
        />
        <IconButton
          icon={<ArrowUpRight />}
          onClick={() => addCurvedText()}
        />
        <IconButton
          icon={<Star />}
          onClick={() => addRectangle()}
        />
      </div>
    </div>
  );
};

export default ShapesSection; 