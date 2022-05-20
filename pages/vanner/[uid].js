import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import Icon from '../../components/shared/Icon';
import styles from '../../styles/_profile.module.scss';
import AnimateHeight from 'react-animate-height';
import { db } from '../../firebase/config';
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { setAllData } from '../../components/helperFunctions';

const User = ({
  name,
  usersFollow,
  setUsersFollow,
  user,
  queryUser,
  detailsUser,
  setCollectedInformation,
  addedDates,
  setAllWishlists,
  wishlistsUser,
}) => {
  const { name: friendsName, email, uid } = queryUser;
  const [isFriend, setIsFriend] = useState(false);
  const [interests, setInterests] = useState([]);
  const [height, setHeight] = useState(0);
  const {
    addedDates: allFriendDates,
    birthdate,
    updatedBirthdate,
    description,
    myInterests,

    profileImage,
  } = detailsUser[0];

  const { wishlist } = wishlistsUser[0];

  useEffect(() => {
    setAllData(
   
      user,
      setCollectedInformation,
      addedDates,
      setUsersFollow,
      setAllWishlists
    );
  }, []);

  useEffect(() => {
    if (myInterests !== undefined) {
      const interest = myInterests;
      const arrInterests = interest.split(',');
      setInterests(arrInterests);
    }
  }, [myInterests]);

  useEffect(() => {
    const userExcists = usersFollow.some((u) => u.uid === uid);

    if (userExcists) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  }, []);

  const handleFollowUsers = () => {
    setIsFriend(true);

    setUsersFollow([...usersFollow, { name, uid, profileImage }]);
  };

  const handleUnFollowUsers = () => {
    setIsFriend(false);
    const removeUser = usersFollow.filter((obj) => {
      return obj.uid !== uid;
    });

    setUsersFollow(removeUser);
  };

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'friends', user.uid);

      updateDoc(docRef, {
        friends: [...usersFollow],
      });
    }
  }, [usersFollow]);
  console.log(height);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfoContainer}>
        <div className={styles.topSection}>
          <NextImage src="/avatar_1.svg" alt="logo" width="150" height="150" />
          <h5>{friendsName}</h5>
          <br />
          <p>{description}</p>
        </div>

        <div>
          {updatedBirthdate ? (
            <div className={styles.dateCard}>
              <div>
                <NextImage
                  src="/birthday-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
              </div>
              <div>
                <h5>{updatedBirthdate}</h5>
                <p>Födelsedag</p>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.dateCard}>
                <div>
                  <NextImage
                    src="/birthday-circle.svg"
                    alt="logo"
                    width="35"
                    height="35"
                  />
                </div>
                <div>
                  <h5>{birthdate}</h5>
                  <p>Födelsedag</p>
                </div>
              </div>
            </>
          )}
          {allFriendDates !== undefined ? (
            allFriendDates.map((dates, i) => (
              <div className={styles.dateCard}>
                <div>
                  <NextImage
                    src={dates.icon}
                    alt="logo"
                    width="35"
                    height="35"
                  />
                </div>
                <div>
                  <h5>{dates.updatedDate}</h5>
                  <p>{dates.selected}</p>
                </div>
              </div>
            ))
          ) : (
            <> </>
          )}

          <div className={styles.bottomSection}>
            <h3>Mina intressen</h3>
            {interests ? (
              interests.map((interest, i) => (
                <div key={i} className={styles.interestsCards}>
                  <p>{interest}</p>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        {isFriend ? (
          <button className={styles.unFollow} onClick={handleUnFollowUsers}>
            Följer
          </button>
        ) : (
          <button className={styles.follow} onClick={handleFollowUsers}>
            Följ
          </button>
        )}
      </div>

      <div className={styles.wishlistContainer}>
        <div>
          <h3>{friendsName.split(' ')[0]}s önskelistor</h3>
        </div>
        {wishlist !== undefined ? (
          wishlist.map(({ icon, listName, items }) => (
            <div className={styles.wishlistsWrapperFriend}>
              <div
                aria-expanded={height !== 0}
                className={styles.wishlistFriend}
                onClick={() => setHeight(height === 0 ? 'auto' : 0)}
              >
                <div>
                  <NextImage src={icon} alt="logo" width="35" height="35" />
                  <h4>{listName}</h4>
                </div>
                <Icon
                  className={styles.plus}
                  src="/plus-icon.svg"
                  altText="Plus-icon"
                  width="15"
                  height="15"
                />
              </div>

              <AnimateHeight id="panel" duration={500} height={height}>
                {items.map((item) => (
                  <div className={styles.list}>
                    <Icon
                      src="/balloons1.svg"
                      alttext="Balloons"
                      width="30"
                      height="30"
                    />
                    <p>{item}</p>
                  </div>
                ))}
              </AnimateHeight>
            </div>
          ))
        ) : (
          <>
            <br />
            <p>Det finns inga sparade önskelistor</p>
          </>
        )}
      </div>
    </div>
  );
};

export default User;

export async function getStaticPaths() {
  const users = [];
  const q = query(collection(db, 'users'));

  const querySnapshot = await getDocs(q);

  querySnapshot.docs.map((doc) => users.push({ ...doc.data() }));

  const paths = users.map((user) => {
    return {
      params: { uid: user.uid },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const uid = context.params.uid;

  const users = [];
  const detailsUser = [];
  const wishlistsUser = [];

  const q = query(collection(db, 'users'));

  const querySnapshot = await getDocs(q);

  querySnapshot.docs.map((doc) => users.push({ ...doc.data() }));

  const queryUser = users.find((user) => user.uid === uid);

  const details = doc(db, 'usersDetails', uid);

  const usersWishlists = doc(db, 'wishlist', uid);

  await getDoc(details).then((snapshot) => {
    detailsUser.push({ ...snapshot.data() });
  });

  await getDoc(usersWishlists).then((snapshot) => {
    wishlistsUser.push({ ...snapshot.data() });
  });

  return {
    props: {
      queryUser,
      detailsUser,
      wishlistsUser,
      fallback: false,
    },
  };
};
