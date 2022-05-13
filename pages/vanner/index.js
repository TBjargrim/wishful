import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/_searchFriends.module.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, query } from 'firebase/firestore';
import Button from '../../components/shared/button/Button';

const Friends = ({ user, users, userDetails, usersFollow, setUsersFollow }) => {
  const [allUsers, setAllUsers] = useState(users);
  const [filterNewFriends, setFilterNewFriends] = useState('');
  const [filterFriends, setFilterFriends] = useState('');
  console.log(userDetails);

  useEffect(() => {
    if (user) {
      /*       const removeCurrentUser = users.filter((singelUser) => {
        return user.uid !== singelUser.uid;
      }); */

      const removeCurrentUser = userDetails.filter((el) => {
        return !usersFollow.some((f) => {
          return f.uid === el.uid && f.uid === el.uid && el.uid === user.uid;
        });
      });
      setAllUsers(removeCurrentUser);
    }
  }, []);

  useEffect(() => {
    const removeCurrentUser = userDetails.filter((el) => {
      return !usersFollow.some((f) => {
        return f.uid === el.uid && f.uid === el.uid;
      });
    });
    setAllUsers(removeCurrentUser);
  }, [usersFollow]);

  const addFriend = (e, name, uid) => {
    e.preventDefault();
    setUsersFollow([...usersFollow, { name, uid }]);
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
          {allUsers &&
            allUsers
              .filter(
                (f) =>
                  f.name.includes(filterNewFriends) || filterNewFriends === ''
              )
              .map((f) => (
                <li>
                  <Link
                    key={f.uid}
                    href={{
                      pathname: '/vanner/[uid]',
                      query: { uid: f.uid },
                    }}
                  >
                    <a>
                      <h5>{f.name}</h5>
                    </a>
                  </Link>
                  <Button
                    type="quinary"
                    onClick={(e) => addFriend(e, f.name, f.uid)}
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
          {usersFollow
            .filter(
              (f) => f.name.includes(filterFriends) || filterFriends === ''
            )
            .map((f) => (
              <li>
                <Link
                  key={f.uid}
                  href={{
                    pathname: '/vanner/[uid]',
                    query: { uid: f.uid },
                  }}
                >
                  <a>
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
