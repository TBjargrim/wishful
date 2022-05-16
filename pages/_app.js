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
  getDoc,
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
  const [usersFollow, setUsersFollow] = useState([]);
  const [allWishlists, setAllWishlists] = useState([]);
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
            uid: user.uid,
            name: user.displayName,
          });
        }
      });

      onSnapshot(docRefFriends, (doc) => {
        if (doc.data() !== undefined) {
          setUsersFollow(doc.data().friends);
        } else {
          setDoc(docRefFriends, { friends: [] });
        }
      });
      onSnapshot(docRefWishlist, (doc) => {
        if (doc.data() !== undefined) {
          let storedLists = doc.data().wishlist;
          setAllWishlists(storedLists);
        } else {
          setDoc(docRefWishlist, { wishlist: [] });
        }
      });
    }
  }, [user]);
  console.log(usersFollow);
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
        allWishlists={allWishlists}
        setAllWishlists={setAllWishlists}
      />
      <Footer />
    </>
  );
}

export default MyApp;
