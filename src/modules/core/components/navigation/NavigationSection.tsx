'use client';
import { FC } from 'react';
import { LucideIcon } from 'lucide-react';
import NavigationItem from './NavigationItem';
import { Role } from '@/modules/auth/types/user.interfaces';
import { useTranslations } from 'next-intl';

interface NavigationItemData {
  label: string;
  href: string;
  icon: LucideIcon;
  isForPublisher?: boolean;
}

interface NavigationSectionProps {
  items: NavigationItemData[];
  isActive: (path: string) => boolean;
  onItemClick: () => void;
  userRole?: Role;
}

const NavigationSection: FC<NavigationSectionProps> = ({ 
  items, 
  isActive, 
  onItemClick, 
  userRole 
}) => {
  const t = useTranslations('Sidebar');
  return (
    <ul className="space-y-1 px-2">
      {items.map((item) => {
        if (item.isForPublisher && userRole !== Role.PUBLISHER) {
          return null;
        }
        
        return (
          <NavigationItem
            key={item.href}
            label={t(item.label)}
            href={item.href}
            icon={item.icon}
            isActive={isActive(item.href)}
            onClick={onItemClick}
          />
        );
      })}
    </ul>
  );
};

export default NavigationSection; 