import React from 'react';

export const VisuallyHidden = <T extends React.ElementType = 'span'>({
  children,
  as,
  style,
  ...props
}: VisuallyHiddenProps<T>) => {
  const Component = as || 'span';

  const visuallyHiddenStyle: React.CSSProperties = {
    position: 'absolute',
    left: '-10000px',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: 'rect(1px, 1px, 1px, 1px)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    ...style,
  };

  return (
    <Component style={visuallyHiddenStyle} {...props}>
      {children}
    </Component>
  );
};

type VisuallyHiddenOwnProps = {
  children: React.ReactNode;
};

export type VisuallyHiddenProps<T extends React.ElementType = 'span'> = VisuallyHiddenOwnProps & {
  as?: T;
} & React.ComponentPropsWithoutRef<T>;
