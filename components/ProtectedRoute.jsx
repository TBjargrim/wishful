import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Router from 'next/router';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      Router.push('/');
    }
  }, [Router, user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
