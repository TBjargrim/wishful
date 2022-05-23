import { useState } from 'react';
import Button from '../components/shared/button/Button';
import styles from '../styles/_signin.module.scss';
import { useAuth } from '../context/AuthContext';
import Router from 'next/router';
import Link from 'next/link';

const SignIn = () => {
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(data.email, data.password, data.displayName);
      Router.push('/hem');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={styles.signinWrapper}>
      <h2>Logga in</h2>
      <div className={styles.firebaseLogin}></div>
      <form className={styles.form} onSubmit={() => handleLogin()}>
        <label htmlFor="name">Email</label>
        <input
          id="name"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="password">Lösenord</label>
        <input
          id="password"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </form>

      <div className={styles.buttonWrapper}>
        {/* <Link href={'/hem'} passHref>
          <a> */}
            <Button onClick={(e) => handleLogin(e)}>Logga in</Button>
          {/* </a>
        </Link> */}

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
