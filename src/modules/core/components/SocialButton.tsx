import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  provider: string;
  loading?: boolean;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  provider,
  className = '',
  loading = false,
  ...props
}) => {
  return (
    <button
      className={`flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="mr-2">{icon}</span>}
      <span className="sr-only">Iniciar sesión con {provider}</span>
    </button>
  );
};

export default SocialButton; 