import './App.css';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Card } from './components/Card/Card';
import productHero from './assets/product-hero.png';

/**
 * Phase 7-A (React → Figma) 用の装飾なし比較ページ。
 * Button/Input/Cardの全variantを並べ、generate_figma_designでのキャプチャ対象にする。
 */
function FigmaCapture() {
  return (
    <div className="showcase">
      <section className="row">
        <Button variant="primary" size="s">Create Account</Button>
        <Button variant="primary" size="m">Create Account</Button>
        <Button variant="primary" size="l">Create Account</Button>
        <Button variant="primary" disabled>Create Account</Button>
      </section>

      <section className="row">
        <Button variant="secondary" size="s">Buy for $338</Button>
        <Button variant="secondary" size="m">Buy for $338</Button>
        <Button variant="secondary" size="l">Buy for $338</Button>
        <Button variant="secondary" disabled>Buy for $338</Button>
      </section>

      <section className="row">
        <Input label="Full Name" placeholder="Reggie James" state="default" />
        <Input label="Email" placeholder="reggiejames001@website.com" state="focus" />
        <Input label="Password" type="password" placeholder="theBirdiSth3W0rD" state="error" />
        <Input label="Full Name" placeholder="Reggie James" state="disabled" />
      </section>

      <section className="row">
        <Card
          imageSrc={productHero}
          title="Air Jordan 1 Retro High OG 'University Blue'"
          state="default"
        />
        <Card
          imageSrc={productHero}
          title="Air Jordan 1 Retro High OG 'University Blue'"
          state="selected"
        />
      </section>
    </div>
  );
}

export default FigmaCapture;
