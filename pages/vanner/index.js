import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/_searchFriends.module.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, query } from 'firebase/firestore';
import Button from '../../components/shared/button/Button';
import NextImage from 'next/image';

const Friends = ({ user, userDetails, usersFollow, setUsersFollow }) => {
  const [allUsers, setAllUsers] = useState(userDetails);
  const [filterNewFriends, setFilterNewFriends] = useState('');
  const [filterFriends, setFilterFriends] = useState('');

  const numberOfFriends = 10;
  const renderList = allUsers.slice(0, numberOfFriends);

  useEffect(() => {
    /*       const removeCurrentUser = users.filter((singelUser) => {
        return user.uid !== singelUser.uid;
      }); */

    let removeCurrentUser = userDetails.filter((el) => {
      return !usersFollow.some((f) => {
        return f.uid === el.uid && f.uid === el.uid;
      });
    });
    setAllUsers(removeCurrentUser);
  }, [user]);

  useEffect(() => {
    let removeCurrentUser = userDetails.filter((el) => {
      return !usersFollow.some((f) => {
        return f.uid === el.uid && f.uid === el.uid;
      });
    });
    setAllUsers(removeCurrentUser);
  }, [usersFollow]);

  const addFriend = (e, name, uid, profileImage) => {
    e.preventDefault();
    setUsersFollow([...usersFollow, { name, uid, profileImage }]);
  };

  const removeFriend = (e, id) => {
    e.preventDefault();

    const filteredFriends = usersFollow.filter((u) => {
      return u.uid !== id;
    });

    setUsersFollow(filteredFriends);
  };

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
          {renderList &&
            renderList
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
  const users = [];
  const userDetails = [];
  const q = query(collection(db, 'users'));
  const queryDetails = query(collection(db, 'usersDetails'));

  const querySnapshot = await getDocs(q);
  const querySnapshotDetails = await getDocs(queryDetails);

  querySnapshot.docs.map((doc) => users.push({ ...doc.data() }));
  querySnapshotDetails.docs.map((doc) => userDetails.push(doc.data()));

  return {
    props: {
      users,
      userDetails,
      fallback: true,
    },
  };
};
