import type { HTMLAttributes } from 'react';

// src/components/ui/Card.tsx
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = ({ className = '', hover = false, children, ...props }: CardProps) => {
  return (
    <div
      className={`card ${hover ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};