import React from 'react';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'destructive';
};

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded ${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'}`}
    >
      {children}
    </button>
  );
};

export default Button;
