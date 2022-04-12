import Button from '../components/shared/button/Button';
import styles from '../styles/_signin.module.scss';
import Link from 'next/link';

const SignIn = () => {
  return (
    <section className={styles.signinWrapper}>
      <h2>Logga in</h2>
      <form>
        <label htmlFor="name">Email</label>
        <input id="name" type="email" />
        <label htmlFor="password">Lösenord</label>
        <input id="password" type="password" />
      </form>
      <Button>Logga in</Button>
      <Link href={'/'} passHref>
        <a>
          <Button type="primary">Tillbaka</Button>
        </a>
      </Link>
    </section>
  );
};

export default SignIn;
