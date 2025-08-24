import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', disabled = false, onClick, ...props }, ref) => {
    const classNames = [styles.button, styles[variant]].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classNames} disabled={disabled} onClick={onClick} {...props}>
        {children}
      </button>
    );
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
