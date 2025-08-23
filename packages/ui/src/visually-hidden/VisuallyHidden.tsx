import React from 'react';

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * VisuallyHidden component hides content visually while keeping it accessible to screen readers.
 *
 * This component uses the "screen reader only" technique that:
 * - Positions content off-screen (not display: none or visibility: hidden)
 * - Maintains accessibility for assistive technologies
 * - Follows WCAG guidelines for accessible hiding
 *
 * @param children - Content to be visually hidden but accessible
 * @param as - HTML element to render (default: 'span')
 */
export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  as: Component = 'span',
  style,
  ...props
}) => {
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
