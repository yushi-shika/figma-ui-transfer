import './App.css';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Card } from './components/Card/Card';
import productHero from './assets/product-hero.png';

function App() {
  return (
    <div className="showcase">
      <section className="row">
        <Button variant="primary">Create Account</Button>
        <Button variant="secondary">Buy for $338</Button>
        <Button variant="primary" disabled>
          Create Account
        </Button>
      </section>

      <section className="row">
        <Input label="Full Name" placeholder="Reggie James" />
        <Input label="Password" type="password" placeholder="••••••••" />
      </section>

      <section className="row">
        <Card
          imageSrc={productHero}
          title="Air Jordan 1 Retro High OG 'University Blue'"
        />
      </section>
    </div>
  );
}

export default App;
