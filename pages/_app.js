import { useRouter } from 'next/router';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import firebase from 'firebase/compat/app';
import { useUser } from '../firebase/useUser';
import '../styles/globals.scss';
import '../styles/firebaseui-styling.global.css';
import { lazy, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

function MyApp({ Component, pageProps }) {
  /*   const { user } = useUser(); */
  const router = useRouter();

  const [user, loading, error] = useAuthState(firebase.default.auth);
  if (user) {
    console.log(loading, user);
  }

  /*   useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [router.pathname]); */

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
