import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import backgroundImage from '../../assets/signup-background.png';
import logoImage from '../../assets/signup-logo.png';
import styles from './SignupScreen.module.css';

export interface SignupScreenProps {
  /** Create Account ボタン押下時のハンドラ */
  onSubmit?: () => void;
  /** "Sign In" リンク押下時のハンドラ */
  onSignIn?: () => void;
  /** "Privacy Policy" リンク押下時のハンドラ */
  onPrivacyPolicy?: () => void;
}

/**
 * Screens/Signup — 既存の Input(default)/Button(primary) を fixture の座標通りに
 * 組み合わせた完成画面(375x812)。
 * 出典: docs/figma-fixtures/screens/signup/design-context.md
 */
export const SignupScreen = ({ onSubmit, onSignIn, onPrivacyPolicy }: SignupScreenProps) => {
  return (
    <div className={styles.screen} data-name="signup screen">
      <div className={styles.background}>
        <img className={styles.backgroundImage} src={backgroundImage} alt="" />
      </div>

      <div className={styles.logo}>
        <img className={styles.logoImage} src={logoImage} alt="logo" />
      </div>

      <div className={`${styles.field} ${styles.fieldFullName}`}>
        <Input label="Full Name" placeholder="Reggie James" />
      </div>

      <div className={`${styles.field} ${styles.fieldEmail}`}>
        <Input label="Email" type="email" placeholder="reggiejames001@website.com" />
      </div>

      <div className={`${styles.field} ${styles.fieldPassword}`}>
        <Input label="Password" type="password" placeholder="theBirdiSth3W0rD" />
      </div>

      <div className={styles.submit}>
        <Button variant="primary" onClick={onSubmit}>
          Create Account
        </Button>
      </div>

      <p className={styles.signInText}>
        Already have an account{' '}
        <button type="button" className={styles.inlineLink} onClick={onSignIn}>
          Sign In
        </button>
      </p>

      <button type="button" className={styles.privacyLink} onClick={onPrivacyPolicy}>
        Privacy Policy
      </button>
    </div>
  );
};
