import React, { forwardRef, useId } from 'react';
import styles from './Grid.module.css';

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, columns = 1, className = '', ...props }, ref) => {
    const id = useId();
    const childArray = React.Children.toArray(children);

    const actualColumns = columns === 1 ? childArray.length : columns;

    const gridStyle: React.CSSProperties & { [key: string]: any } = {
      '--grid-columns': actualColumns,
      gridTemplateColumns: actualColumns === 1 ? '1fr' : `repeat(${actualColumns}, 1fr)`,
      ...props.style,
    };

    return (
      <div ref={ref} className={styles.grid} style={gridStyle} {...props}>
        {children}
      </div>
    );
  },
);

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: number;
}
