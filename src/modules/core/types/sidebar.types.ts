import { LucideIcon } from 'lucide-react';

export interface NavigationItemData {
  label: string;
  href: string;
  icon: LucideIcon;
  isForPublisher?: boolean;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface NavigationItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export interface NavigationSectionProps {
  items: NavigationItemData[];
  isActive: (path: string) => boolean;
  onItemClick: () => void;
  userRole?: string;
}

export interface SidebarHeaderProps {
  onClose: () => void;
}

export interface SidebarOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

export interface LogoutButtonProps {
  onClick: () => void;
} 