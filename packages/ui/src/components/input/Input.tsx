import React, { forwardRef, useId } from 'react';
import { Label } from '../label/Label';
import styles from './Input.module.css';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      disabled = false,
      value,
      name,
      onChange,
      label,
      labelSize = 'md',
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = useId();
    const finalId = id || inputId;

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <Label htmlFor={finalId} size={labelSize} disabled={disabled}>
            {label}
          </Label>
        )}
        <input
          id={finalId}
          type={type}
          className={`${styles.input} ${disabled ? styles.disabled : ''}`}
          disabled={disabled}
          value={value}
          name={name}
          onChange={onChange}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelSize?: 'xs' | 'sm' | 'md';
  type?: 'text' | 'password' | 'email' | 'number' | 'search';
  disabled?: boolean;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
