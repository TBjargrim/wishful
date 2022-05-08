import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/_searchFriends.module.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, query } from 'firebase/firestore';

const Friends = ({ users }) => {
  /*   console.log(users); */
  return (
    <div className={styles.friendsWrapper}>
      <section className={styles.leftColumn}>
        <h3>Hitta nya vänner</h3>

        <input placeholder="Sök bland nya vänner" />
      </section>
      <div>
        {users &&
          users.map((user) => (
            <Link
              key={user.uid}
              href={{
                pathname: '/vanner/[uid]',
                  query: { uid: user.uid }, 
              }}
            >
              <a>
                <h3>{user.name}</h3>
              </a>
            </Link>
          ))}
      </div>
      <section className={styles.rightColumn}>
        <h3>Mina vänner</h3>
        <input placeholder="Sök bland mina vänner" />
      </section>
    </div>
  );
};

export default Friends;

export const getStaticProps = async () => {
  const users = [];
  const q = query(collection(db, 'users'));

  const querySnapshot = await getDocs(q);

  querySnapshot.docs.map((doc) => users.push({ ...doc.data() }));

  return {
    props: {
      users,
      fallback: true,
    },
  };
};
