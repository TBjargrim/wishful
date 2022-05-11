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
import { useLocalStorage } from '../components/useLocalStorage';
import { db } from '../firebase/config';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const auth = getAuth();
  const [addedDates, setAddedDates] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [usersFollow, setUsersFollow] = useLocalStorage('friends', {
    friend: {},
  });
  const [interests, setInterests] = useState([]);

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
      const docRefFriends = doc(db, 'friends', user.uid);
      const docRefWishlist = doc(db, 'wishlist', user.uid);

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
            addedDates,
          });
        }
      });

      onSnapshot(docRefFriends, (doc) => {
        if (doc.data() !== undefined) {
          localStorage.setItem('friends', JSON.stringify({ ...doc.data() }));
        } else {
          setDoc(docRefFriends, { friend: {} });
        }
      });

      onSnapshot(docRefWishlist, (doc) => {
        if (doc.data() !== undefined) {
          localStorage.setItem('wishlist', JSON.stringify({ ...doc.data() }));
        } else {
          setDoc(docRefWishlist, { wishlist: [] });
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
        usersFollow={usersFollow}
        setUsersFollow={setUsersFollow}
        setInterests={setInterests}
        interesets={interests}
      />
      <Footer />
    </>
  );
}

export default MyApp;
