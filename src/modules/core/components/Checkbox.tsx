import React, { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ 
  label, 
  className = '', 
  error,
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            className={`h-4 w-4 text-blue-900 border-gray-300 rounded focus:ring-blue-500 ${error ? 'border-red-500' : ''} ${className}`}
            {...props}
          />
        </div>
        <div className="ml-2 text-sm">
          <label className="font-medium text-gray-700 cursor-pointer">
            {label}
          </label>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox; 