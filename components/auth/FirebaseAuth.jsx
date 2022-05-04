import initFirebase from '../../firebase/config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/config';

const FirebaseAuthConfig = {
  signInFlow: 'pop-up',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
    },
  ],
  signInSuccessUrl: '/min-profil',
  credentialHelper: 'none',
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
