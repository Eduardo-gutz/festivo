'use client';
import Image from 'next/image';

interface UserAvatarProps {
  avatar?: string;
  username: string;
  fullName?: string;
  size?: number;
}

export default function UserAvatar({ avatar, username, fullName, size = 40 }: UserAvatarProps) {
  return (
    <div className="flex items-center w-10 h-10 rounded-full overflow-hidden" style={{ width: size, height: size }}>
      {avatar ? (
        <Image 
          src={avatar} 
          alt={fullName || username} 
          width={size} 
          height={size} 
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-primary text-background text-xl font-medium">
          {(fullName || username).charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
} 