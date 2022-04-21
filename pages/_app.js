import { Provider } from 'react-redux';
import { wrapper, newStore } from '../redux/index.js';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { useRouter } from 'next/router';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { useUser } from '../firebase/useUser';
import '../styles/globals.scss';
import '../styles/firebaseui-styling.global.css';
import SignIn from './logga-in.js';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const { user } = useUser();

  const router = useRouter();
  console.log(user);
  /*   const rrfConfig = { userProfile: 'users' }; // react-redux-firebase config

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const store = newStore();

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };
*/
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
    /*       </ReactReduxFirebaseProvider>
    </Provider> */
  );
}

export default MyApp;
