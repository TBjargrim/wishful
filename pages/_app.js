import { useRouter } from 'next/router';
import Navbar from '../components/navbar/Navbar';
import NavbarIcon from '../components/navbar/NavbarIcon';
import Footer from '../components/footer/Footer';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const showHeader =
    router.pathname === '/' ||
    router.pathname === '/logga-in' ||
    router.pathname === '/skapa-konto'
      ? false
      : true;
  return (
    <>
      {showHeader ? <Navbar /> : <NavbarIcon />}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
