import { useRouter } from 'next/router';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { useUser } from '../firebase/useUser';
import '../styles/globals.scss';
import '../styles/firebaseui-styling.global.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [router.pathname]);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
