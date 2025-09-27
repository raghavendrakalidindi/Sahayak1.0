import React from 'react';

interface PulsatingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const PulsatingButton: React.FC<PulsatingButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  type = 'button',
  disabled = false 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center
        bg-emerald-600 text-white font-semibold rounded-lg
        hover:bg-emerald-700 transition-colors
        shadow-lg hover:shadow-xl transform hover:-translate-y-1
        disabled:opacity-50 disabled:cursor-not-allowed
        before:absolute before:inset-0 before:rounded-lg
        before:bg-emerald-400 before:opacity-40
        before:animate-ping before:duration-2000
        before:scale-105
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default PulsatingButton;