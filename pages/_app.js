
import { Provider } from 'react-redux';
import { wrapper, newStore } from '../redux/index.js';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import {useUser} from '../firebase/useUser'
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  const { user, logout } = useUser();
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
