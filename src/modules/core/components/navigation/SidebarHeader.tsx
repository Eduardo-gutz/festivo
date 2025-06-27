'use client';
import { FC } from 'react';
import { X } from 'lucide-react';

interface SidebarHeaderProps {
  onClose: () => void;
}

const SidebarHeader: FC<SidebarHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex items-center justify-end p-4 border-b border-primary/20">
      <button 
        onClick={onClose}
        className="md:hidden text-white hover:text-gray-300"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SidebarHeader; 