'use client';
import { FC } from 'react';

interface SidebarOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

const SidebarOverlay: FC<SidebarOverlayProps> = ({ isOpen, onClick }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
      onClick={onClick}
    />
  );
};

export default SidebarOverlay; 