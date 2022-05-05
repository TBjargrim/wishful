import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mapUserData } from './mapUserData';
import { auth } from './config';

const useUser = () => {
  const [authUser, setAuthUser] = useState();
  const router = useRouter();

  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.clear();
      router.push('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const cancelAuthListener = auth.onIdTokenChanged((authUser) => {
      if (authUser) {
        const userData = mapUserData(authUser);
        setAuthUser(userData);
      } else {
        setAuthUser();
      }
    });
    return () => {
      cancelAuthListener();
    };
  }, []);

  return { authUser, logout };
};

export { useUser };
