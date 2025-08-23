import React from 'react';
import styles from './RadioButton.module.css';

export const RadioButton = ({
  label,
  labelSize = 'md',
  variant = 'default',
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
  ...props
}: RadioButtonProps) => {
  const labelClassNames = [styles.label, styles['label-' + labelSize]].filter(Boolean).join(' ');
  const containerClassNames = [styles.radioButton, variant === 'card' ? styles.cardVariant : null]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={containerClassNames}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={styles.input}
        {...props}
      />
      <span className={styles.customRadio} />
      {label && <span className={labelClassNames}>{label}</span>}
    </label>
  );
};

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
