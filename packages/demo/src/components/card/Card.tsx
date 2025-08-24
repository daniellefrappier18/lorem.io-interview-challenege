import React, { forwardRef } from 'react';
import styles from './Card.module.css';

export const Card = forwardRef((props: CardProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div className={styles.card} ref={ref} {...props}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
});

interface CardProps {
  children: React.ReactNode;
}
