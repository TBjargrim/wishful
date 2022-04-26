import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { store } from '../redux/store';

import { useUser } from '../firebase/useUser';
import '../styles/globals.scss';
import '../styles/firebaseui-styling.global.css';

function MyApp({ Component, pageProps }) {

  const { user } = useUser();
  const router = useRouter();

 


  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [router.pathname]);

  return (
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
  );
}

export default MyApp;
