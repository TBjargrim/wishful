import firebase from 'firebase/compat/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBGKKJbM_hm9yIXwRbqvTZOXsiy-_HNqtM',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATA_URL,
  projectId: 'wishlist-cd524',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export default initFirebase;
