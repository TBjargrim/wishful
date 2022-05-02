import { useRouter } from 'next/router';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

import 'firebase/compat/firestore';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import '../styles/globals.scss';
import '../styles/firebaseui-styling.global.css';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db } from '../firebase/config';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const createUserInformation = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const docs = await getDocs(q);

      if (docs.docs.length === 0) {
        await setDoc(collection(db, 'users', user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      router.push('/min-profil');
      createUserInformation();
    }
  }, [user, loading]);

  return (
    <>
      <Navbar />
      <Component {...pageProps} user={user} />
      <Footer />
    </>
  );
}

export default MyApp;
