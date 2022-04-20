import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { wrapper, newStore } from '../redux/index.js';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/compat/app';

import firebaseConfig from '../firebase/config';
import Navbar from '../components/navbar/Navbar';
import NavbarIcon from '../components/navbar/NavbarIcon';
import Footer from '../components/footer/Footer';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const rrfConfig = { userProfile: 'users' }; // react-redux-firebase config

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
  console.log(rrfProps);
  const showHeader =
    router.pathname === '/' ||
    router.pathname === '/logga-in' ||
    router.pathname === '/skapa-konto'
      ? false
      : true;

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {showHeader ? <Navbar /> : <NavbarIcon />}
        <Component {...pageProps} />
        <Footer />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
