import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

import 'firebase/compat/firestore';
import {
  doc,
  addDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import '../styles/globals.scss';
import '../styles/firebaseui-styling.global.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocalStorage } from '../components/useLocalStorage';
import { db } from '../firebase/config';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [info, setInfo] = useLocalStorage('collectedInformation', {
    profileImage: '',
    birthdate: '',
    myInterests: '',
    description: '',
    updatedBirthdate: '',
    addedDates: [],
  });

  const createUserInformation = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const docs = await getDocs(q);

      if (docs.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
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

  const createUserDetails = async () => {
    const docRef = doc(db, 'usersDetails', user.uid);
    setDoc(docRef, {
      ...info,
    });
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      router.push('/min-profil');
      createUserInformation();
      createUserDetails();
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
