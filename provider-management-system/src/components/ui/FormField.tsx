// src/components/ui/FormField.tsx
import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  children: ReactNode;
  htmlFor?: string;
}

export const FormField = ({ 
  label, 
  required, 
  error, 
  helpText, 
  children, 
  htmlFor 
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={htmlFor}
        className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {children}
      
      {helpText && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400" id={`${htmlFor}-help`}>
          {helpText}
        </p>
      )}
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1" role="alert">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};