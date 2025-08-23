import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  children: React.ReactNode;
  highlighted?: boolean;
}

export const Card: React.FC<CardProps> = ({ title, children, highlighted = false }) => {
  return (
    <div className={`${styles.card} ${highlighted ? styles.highlighted : ''}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
