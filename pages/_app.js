import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

import 'firebase/compat/firestore';
import {
  doc,
  onSnapshot,
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

import { db } from '../firebase/config';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const auth = getAuth();
  const [addedDates, setAddedDates] = useState([]);
  const [user, loading, error] = useAuthState(auth);

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

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'usersDetails', user.uid);

      onSnapshot(docRef, (doc) => {
        if (doc.data() !== undefined) {
          localStorage.setItem(
            'collectedInformation',
            JSON.stringify(doc.data())
          );
        } else {
          setDoc(docRef, {
            profileImage: '',
            birthdate: '',
            myInterests: '',
            description: '',
            updatedBirthdate: '',
            addedDates,
          });
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      createUserInformation();
    }
  }, [user, loading]);

  return (
    <>
      <Navbar />
      <Component
        {...pageProps}
        user={user}
        setAddedDates={setAddedDates}
        addedDates={addedDates}
      />
      <Footer />
    </>
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
