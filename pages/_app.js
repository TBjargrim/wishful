import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import '../styles/globals.scss';
import { AuthContextProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [addedDates, setAddedDates] = useState([]);
  const [usersFollow, setUsersFollow] = useState([]);
  const [allWishlists, setAllWishlists] = useState([]);
  const [collectedInformation, setCollectedInformation] = useState({});

  const noAuthRequired = ['/', '/logga-in', '/skapa-konto'];

  return (
    <AuthContextProvider>
      <Navbar collectedInformation={collectedInformation} />
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component
            {...pageProps}
            name={name}
            setName={setName}
            setAddedDates={setAddedDates}
            addedDates={addedDates}
            usersFollow={usersFollow}
            setUsersFollow={setUsersFollow}
            allWishlists={allWishlists}
            setAllWishlists={setAllWishlists}
            collectedInformation={collectedInformation}
            setCollectedInformation={setCollectedInformation}
          />
        </ProtectedRoute>
      )}
      <Footer />
    </AuthContextProvider>
  );
}

export default MyApp;
