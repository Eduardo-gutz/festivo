import { User } from '@/modules/auth/types/user.interfaces';
import UserAvatar from '../UserAvatar';
import Popover from '../Popover';
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/modules/redux/hooks/reduxAppHooks';
import { logoutThunk } from '@/modules/redux/slices/auth/thunk/auth.thunk';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavUserProfileProps {
  user: User;
}

const NavUserProfile: FC<NavUserProfileProps> = ({ user }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const t = useTranslations('Navigation');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.push('/');
    setIsPopoverOpen(false);
  };

  return (
    <Popover
      open={isPopoverOpen}
      onClose={() => setIsPopoverOpen(false)}
      content={
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px]">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.full_name || user.username}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <div className="py-1">
          </div>

          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      }
    >
      <button
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <UserAvatar
          avatar={user.avatar}
          username={user.username}
          fullName={user.full_name}
        />
      </button>
    </Popover>
  );
};

export default NavUserProfile; 