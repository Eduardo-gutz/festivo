'use client';
import { FC } from 'react';
import SidebarOverlay from './SidebarOverlay';
import SidebarHeader from './SidebarHeader';
import NavigationSection from './NavigationSection';
import LogoutButton from './LogoutButton';
import { navigationItems, configItems } from '../../utils/routes';
import { useAppDispatch, useAppSelector } from '@/modules/redux/hooks/reduxAppHooks';
import { logout } from '@/modules/redux/slices/auth/auth.slice';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    router.push('/login');
  };

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClick={onClose} />

      <aside className={`
        sticky top-0 left-0 w-64 bg-primary text-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-auto
      `}>
        <div className="flex flex-col h-full">
          <SidebarHeader onClose={onClose} />

          <nav className="flex-1 py-4">
            <NavigationSection
              items={navigationItems}
              isActive={isActive}
              onItemClick={onClose}
              userRole={user?.role}
            />

            <div className="mx-4 my-4 border-t border-white/20" />

            <NavigationSection
              items={configItems}
              isActive={isActive}
              onItemClick={onClose}
              userRole={user?.role}
            />
          </nav>

          <LogoutButton onClick={handleLogout} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 