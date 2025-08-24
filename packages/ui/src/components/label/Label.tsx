import React, { forwardRef } from 'react';
import styles from './Label.module.css';

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, size = 'md', disabled = false, className, ...props }, ref) => {
    const labelClassNames = [
      styles.label,
      styles[`label-${size}`],
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label ref={ref} className={labelClassNames} {...props}>
        {children}
      </label>
    );
  },
);

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md';
  disabled?: boolean;
}
