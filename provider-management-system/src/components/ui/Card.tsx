import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = ({ className = '', hover = false, children, ...props }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-6 ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};