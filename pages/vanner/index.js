import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/_searchFriends.module.scss';
import { db } from '../../firebase/config';
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import Button from '../../components/shared/button/Button';
import NextImage from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { setAllData } from '../../components/helperFunctions';

const Friends = ({
  name,
  userDetails,
  usersFollow,
  setUsersFollow,
  setCollectedInformation,
  addedDates,
  setAllWishlists,
}) => {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState(userDetails);
  const [filterNewFriends, setFilterNewFriends] = useState('');
  const [filterFriends, setFilterFriends] = useState('');

  useEffect(() => {
    if (user) {
      const removeCurrentUser = allUsers.filter(
        (item) => item.uid !== user.uid
      );

      setAllUsers(removeCurrentUser);
    }
  }, []);
  console.log(user);

  useEffect(() => {
    const docRefFriends = doc(db, 'friends', user.uid);

    onSnapshot(docRefFriends, (doc) => {
      if (doc.data()) {
        console.log(doc.data());
        setUsersFollow(doc.data().friends);
      } else {
        setDoc(docRefFriends, { friends: [] });
      }
    });
  }, []);

  useEffect(() => {
    const removeFromAllUsers = allUsers.filter((el) => {
      el.uid !== el.uid;
      return !usersFollow.some((f) => {
        return f.uid === el.uid && f.uid === el.uid;
      });
    });
    setAllUsers(removeFromAllUsers);
  }, [usersFollow]);

  const addFriend = (e, name, uid, profileImage) => {
    e.preventDefault();
    setUsersFollow([...usersFollow, { name, uid, profileImage }]);
  };

  const removeFriend = (e, uid) => {
    e.preventDefault();

    const filteredFriends = usersFollow.filter((u) => {
      return u.uid !== uid;
    });

    setUsersFollow(filteredFriends);
  };

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'friends', user.uid);

      updateDoc(docRef, {
        friends: [...usersFollow],
      });
    }
  }, [usersFollow]);
  console.log(usersFollow);

  return (
    <div className={styles.friendsWrapper}>
      <section className={styles.leftColumn}>
        <h3>Hitta nya vänner</h3>

        <input
          placeholder="Sök bland nya vänner"
          value={filterNewFriends}
          onChange={(event) => setFilterNewFriends(event.target.value)}
        />

        <ul className={styles.friendsLists}>
          {allUsers &&
            allUsers
              .filter(
                (f) =>
                  f.name.includes(filterNewFriends) || filterNewFriends === ''
              )
              .map((f) => (
                <li key={f.uid}>
                  <Link
                    key={f.uid}
                    href={{
                      pathname: '/vanner/[uid]',
                      query: { uid: f.uid },
                    }}
                  >
                    <a>
                      <div className={styles.profileImage}>
                        {f.profileImage !== '' ? (
                          <></>
                        ) : (
                          <NextImage
                            src="/avatar_1.svg"
                            alt="logo"
                            width="50"
                            height="50"
                          />
                        )}
                      </div>
                      <h5>{f.name}</h5>
                    </a>
                  </Link>
                  <Button
                    type="quinary"
                    onClick={(e) => addFriend(e, f.name, f.uid, f.profileImage)}
                  >
                    Lägg till +
                  </Button>
                </li>
              ))}
        </ul>
      </section>

      <section className={styles.rightColumn}>
        <h3>Mina vänner</h3>
        <input
          placeholder="Sök bland mina vänner"
          value={filterFriends}
          onChange={(event) => setFilterFriends(event.target.value)}
        />
        <ul className={styles.friendsLists}>
          {usersFollow &&
            usersFollow
              .filter(
                (f) => f.name.includes(filterFriends) || filterFriends === ''
              )
              .map((f) => (
                <li key={f.uid}>
                  <Link
                    key={f.uid}
                    href={{
                      pathname: '/vanner/[uid]',
                      query: { uid: f.uid },
                    }}
                  >
                    <a>
                      <div className={styles.profileImage}>
                        {f.profileImage !== '' ? (
                          <></>
                        ) : (
                          <NextImage
                            src="/avatar_1.svg"
                            alt="logo"
                            width="50"
                            height="50"
                          />
                        )}
                      </div>
                      <h5>{f.name}</h5>
                    </a>
                  </Link>
                  <Button
                    type="quaternary"
                    onClick={(e) => removeFriend(e, f.uid)}
                  >
                    Ta bort
                  </Button>
                </li>
              ))}
        </ul>
      </section>
    </div>
  );
};

export default Friends;

export const getStaticProps = async () => {
  const userDetails = [];

  const queryDetails = query(collection(db, 'usersDetails'));

  const querySnapshotDetails = await getDocs(queryDetails);

  querySnapshotDetails.docs.map((doc) => userDetails.push(doc.data()));

  return {
    props: {
      userDetails,
      fallback: true,
    },
  };
};
