import Button from '../components/shared/button/Button';
import styles from '../styles/_signin.module.scss';
import Link from 'next/link';

const CreateAccount = () => {
  return (
    <section className={styles.signinWrapper}>
      <h2>Skapa konto</h2>
      <form className={styles.form}>
        <label htmlFor="name">Användarnamn</label>
        <input id="name" type="text" placeholder="Användarnamn" />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="wishful@wishful.com" />
        <label htmlFor="date">Födelsedatum</label>
        <input id="date" type="num" placeholder="890101" />

        <div className={styles.passwordWrapper}>
          <div>
        <label htmlFor="password">Lösenord</label>
        <input id="password" type="password" placeholder="********" />
        </div>
        <div>
        <label htmlFor="password">Upprepa lösenord</label>
        <input id="password" type="password" placeholder="********" />
        </div>
        </div>

      </form>

      <div className={styles.buttonWrapper}>
      <Link href={'/kontoinstallningar'} passHref>
        <a>
          <Button>Bekräfta</Button>
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

export default CreateAccount;
