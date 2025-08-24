import React, { forwardRef } from 'react';
import styles from './VisuallyHidden.module.css';

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ children, ...props }, ref) => {
    return (
      <span ref={ref} className={styles.visuallyHidden} {...props}>
        {children}
      </span>
    );
  },
);

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}
