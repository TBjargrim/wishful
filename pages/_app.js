import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
