'use client';
import { FC } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

const NavigationItem: FC<NavigationItemProps> = ({ 
  label, 
  href, 
  icon: IconComponent, 
  isActive, 
  onClick 
}) => {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`
          flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
          ${isActive 
            ? 'bg-white/20 text-white' 
            : 'text-white/80 hover:bg-white/10 hover:text-white'
          }
        `}
      >
        <IconComponent className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default NavigationItem; 