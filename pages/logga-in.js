
import Button from '../components/shared/button/Button';
import styles from '../styles/_signin.module.scss';
import Link from 'next/link';

const SignIn = () => {
  return (
    <section className={styles.signinWrapper}>
      <h2>Logga in</h2>
      <div className={styles.firebaseLogin}>
  
      </div>
      <form className={styles.form}>
        <label htmlFor="name">Email</label>
        <input id="name" type="email" />
        <label htmlFor="password">Lösenord</label>
        <input id="password" type="password" />
      </form>

      <div className={styles.buttonWrapper}>
        <Link href={'/hemsida'} passHref>
          <a>
            <Button>Logga in</Button>
          </a>
        </Link>
        <Link href={'/'} passHref>
          <a>
            <Button type="transparent">Tillbaka</Button>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
