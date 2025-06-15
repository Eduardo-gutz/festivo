import React, { useState, InputHTMLAttributes, forwardRef } from 'react';
import Input from './Input';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  label,
  error,
  helperText,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleShowPassword = () => setShowPassword(prev => !prev);
  
  return (
    <Input
      ref={ref}
      label={label}
      error={error}
      helperText={helperText}
      type={showPassword ? 'text' : 'password'}
      icon={
        <button 
          type="button" 
          onClick={toggleShowPassword}
          className="focus:outline-none"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-500" />
          ) : (
            <Eye className="w-5 h-5 text-gray-500" />
          )}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput; 