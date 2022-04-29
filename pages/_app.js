import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { store } from '../redux/store';
import { readData } from '../components/firestore/Read';
import { useUser } from '../firebase/useUser';
import '../styles/globals.scss';
import '../styles/firebaseui-styling.global.css';
import initFirebase from '../firebase/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function MyApp({ Component, pageProps }) {
  const { user } = useUser();
  const router = useRouter();

  /*   useEffect(() => {
    readData(user);
  }, []); */
  console.log(user);
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

/* MyApp.getInitialProps = async function () {
  const db = firebase.firestore();
  let data = [];
  const querySnapshot = await db.collection('data').get();
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return {
    data,
  };
}; */

/* MyApp.getInitialProps = async (ctx) => {
  firebase.initializeApp(firebaseConfig);

  let usersRef = firebase.firestore().collection('users');
  let snapshot = await usersRef.get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
  let data = [];
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    data.push(doc.data());
  });
  return { props: data };
};
 */
