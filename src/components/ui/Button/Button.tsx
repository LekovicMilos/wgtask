import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  onClick: () => void;
  variant?: 'success' | 'danger' | 'ghost';
  size?: 'medium' | 'small';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, variant, size = 'medium', className, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${variant ? styles[variant] : ''} ${size ? styles[size] : ''} ${className ?? className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
