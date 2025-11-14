// src/components/ui/FormSection.tsx
import type { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const FormSection = ({ title, description, children }: FormSectionProps) => {
  return (
    <div className="bg-gray-50/50 border border-gray-200 rounded-xl p-6 space-y-4 dark:bg-gray-700/50 dark:border-gray-600">
      <div className="border-b border-gray-200 pb-3 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};