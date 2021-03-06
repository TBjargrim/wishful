import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBGKKJbM_hm9yIXwRbqvTZOXsiy-_HNqtM',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATA_URL,
  projectId: 'wishlist-cd524',
  storageBucket: 'wishlist-cd524.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const colRefUserDetails = collection(db, 'usersDetails');
export const colRefUser = collection(db, 'users');
export const colRefWishlist = collection(db, 'wishlist');
export const storage = getStorage(app);
