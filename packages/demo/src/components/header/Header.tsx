import React from 'react';
import { forwardRef } from 'react';
import styles from './Header.module.css';

export const Header = forwardRef((props: HeaderProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <header className={styles.header} ref={ref} {...props}>
      <div className={styles.logo}>{props.logo}</div>
      {props.children && <div className={styles.content}>{props.children}</div>}
    </header>
  );
});

interface HeaderProps {
  logo: React.ReactNode;
  children?: React.ReactNode;
}
