import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  fullWidth = false,
  variant = 'primary',
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/80 text-white',
    secondary: 'bg-secondary hover:bg-secondary/80 text-white',
    outline: 'border border-gray-300 hover:bg-gray-100 text-gray-800'
  };

  return (
    <button
      className={`${baseClasses} ${widthClass} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 