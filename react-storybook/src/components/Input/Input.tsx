import { useId, useState, type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export type InputVisualState = 'default' | 'focus' | 'error' | 'disabled';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label: string;
  /**
   * ★ default はFigma実測。focus/error/disabled は☆(design-system-rules.mdの
   * トークンから外挿したVisual state)。Storybook argsで強制表示する。
   */
  state?: InputVisualState;
  /** password の場合、実際の表示切替 (Interactive state) を伴う "hide" トグルを表示 */
  type?: 'text' | 'email' | 'password';
}

export const Input = ({
  label,
  state = 'default',
  type = 'text',
  disabled,
  className,
  ...rest
}: InputProps) => {
  const inputId = useId();
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === 'password';
  const isDisabled = disabled || state === 'disabled';

  const wrapperClasses = [
    styles.wrapper,
    state === 'focus' ? styles.stateFocus : '',
    state === 'error' ? styles.stateError : '',
    state === 'disabled' ? styles.stateDisabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.fieldWrap}>
        <input
          id={inputId}
          className={styles.input}
          type={isPassword && !revealed ? 'password' : 'text'}
          disabled={isDisabled}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.hideToggle}
            disabled={isDisabled}
            onClick={() => setRevealed((prev) => !prev)}
            aria-label={revealed ? 'hide password' : 'show password'}
          >
            {revealed ? 'hide' : 'show'}
          </button>
        )}
      </div>
    </div>
  );
};
