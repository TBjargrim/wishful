import initFirebase from '../../firebase/config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { setUserCookie } from '../../firebase/userCookies';
import { mapUserData } from '../../firebase/mapUserData';

initFirebase();

const auth = getAuth();

const FirebaseAuthConfig = {
  signInFlow: 'pop-up',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
  ],
  signInSuccessUrl: '/hem',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = mapUserData(user);
      setUserCookie(userData);
    },
  },
};

const FirebaseAuth = () => {
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
  }, []);

  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth uiConfig={FirebaseAuthConfig} firebaseAuth={auth} />
      ) : null}
    </div>
  );
};

export default FirebaseAuth;
