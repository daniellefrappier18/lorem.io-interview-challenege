import React, { useId, forwardRef } from 'react';
import { Label } from '../label/Label';
import styles from './RadioButton.module.css';

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      label,
      labelSize = 'md',
      variant = 'default',
      name,
      value,
      checked = false,
      disabled = false,
      onChange,
      ...props
    },
    ref,
  ) => {
    const inputId = useId();
    const containerClassNames = [styles.radioButton, variant === 'card' ? styles.cardVariant : null]
      .filter(Boolean)
      .join(' ');

    return (
      <Label className={containerClassNames} htmlFor={inputId} size={labelSize} disabled={disabled}>
        <input
          ref={ref}
          id={inputId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className={styles.input}
          {...props}
        />
        <span className={styles.customRadio} aria-hidden="true" />
        {label && (
          <span className={styles.labelText} id={`${inputId}-label`}>
            {label}
          </span>
        )}
      </Label>
    );
  },
);

export interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelSize?: 'xs' | 'sm' | 'md';
  variant?: 'default' | 'card';
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
