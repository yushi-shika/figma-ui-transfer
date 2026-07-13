import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 's' | 'm' | 'l';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** ★ Figmaに両方の実例あり (Create Account = primary / Buy for $.. Size.. = secondary) */
  variant?: ButtonVariant;
  /** ☆ Figmaは1サイズのみ。m を実測値、s/l はスケール外挿 */
  size?: ButtonSize;
  children?: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'm',
  disabled = false,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
