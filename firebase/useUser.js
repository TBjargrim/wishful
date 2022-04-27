import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import initFirebase from './config';
import { mapUserData } from './mapUserData';

initFirebase();

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();
  const auth = getAuth();

  const logout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const cancelAuthListener = auth.onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUser(userData);
      } else {
        setUser();
      }
    });
    return () => {
      cancelAuthListener();
    };
  }, []);

  return { user, logout };
};

export { useUser };
