import type { ButtonHTMLAttributes } from 'react';
import styles from './Card.module.css';

export type CardState = 'default' | 'selected';

export interface CardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imageSrc: string;
  title: string;
  /** ★ default (Figma実測) / ☆ selected (外挿, Visual state) */
  state?: CardState;
}

export const Card = ({
  imageSrc,
  title,
  state = 'default',
  className,
  ...rest
}: CardProps) => {
  const classes = [styles.card, state === 'selected' ? styles.selected : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} {...rest}>
      <span className={styles.imageFrame}>
        <img className={styles.image} src={imageSrc} alt={title} />
      </span>
      <p className={styles.title}>{title}</p>
    </button>
  );
};
