import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  provider: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  provider,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${className}`}
      {...props}
    >
      <span className="mr-2">{icon}</span>
      <span className="sr-only">Iniciar sesión con {provider}</span>
    </button>
  );
};

export default SocialButton; 