import { useEffect, useState } from 'react';
import Button from '../components/shared/button/Button';
import styles from '../styles/_signin.module.scss';
import { useAuth } from '../context/AuthContext';
import Router from 'next/router';

const CreateAccount = ({ setName }) => {
  const { signup } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
    /*     name: '', */
  });

  /*   useEffect(() => {
    setName(data.name);
  }, [data]); */

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(data.email, data.password);

      Router.push('kontoinstallningar');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={styles.signinWrapper}>
      <h2>Skapa konto</h2>
      <form className={styles.form}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="wishful@wishful.com"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <div className={styles.passwordWrapper}>
          <div>
            <label htmlFor="password">Lösenord</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
        </div>
      </form>

      <div className={styles.buttonWrapper}>
        {/*       <Link href={'/kontoinstallningar'} passHref>
        <a> */}
        <Button onClick={(e) => handleSignUp(e)}>Bekräfta</Button>
        {/*         </a>
      </Link>

      <Link href={'/'} passHref>
        <a> */}
        <Button type="transparent">Tillbaka</Button>
        {/*         </a>
      </Link> */}
      </div>
    </section>
  );
};

export default CreateAccount;
