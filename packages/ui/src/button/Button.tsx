import React from 'react';
import styles from './Button.module.css';

export const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  const classNames = [styles.button, styles[variant]].filter(Boolean).join(' ');

  return (
    <button className={classNames} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
