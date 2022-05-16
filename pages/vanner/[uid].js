import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import Icon from '../../components/shared/Icon';
import styles from '../../styles/_profile.module.scss';
import { db } from '../../firebase/config';
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

const User = ({
  usersFollow,
  setUsersFollow,
  user,
  queryUser,
  detailsUser,
  interests,
  setInterests,
}) => {
  const { name, email, uid } = queryUser;
  const [isFriend, setIsFriend] = useState(false);
  console.log(detailsUser);
  const {
    addedDates,
    birthdate,
    updatedBirthdate,
    description,
    myInterests,
    profileImage,
  } = detailsUser[0];

  useEffect(() => {
    if (myInterests !== undefined) {
      const interests = myInterests;
      const arrInterests = interests.split(',');
      setInterests(arrInterests);
    }
  }, [detailsUser]);

  useEffect(() => {
    /*    var usersFollowArr = Object.keys(usersFollow).map((key) => {
      return usersFollow[key];
    }); */

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

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfoContainer}>
        <div className={styles.topSection}>
          <NextImage src="/avatar_1.svg" alt="logo" width="150" height="150" />
          <h5>{name}</h5>
          <p>{email}</p>
          <p>{description}</p>
        </div>

        <div>
          {updatedBirthdate ? (
            <div className={styles.middleSection}>
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
            </div>
          ) : (
            <>
              <div className={styles.middleSection}>
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
              </div>
            </>
          )}
          {addedDates !== undefined ? (
            addedDates.map((dates, i) => (
              <div key={i} className={styles.dateCard}>
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
              interests.map((interest) => (
                <div className={styles.interestsCards}>
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
          <h3>{name}s önskelistor</h3>
        </div>
        <div className={styles.wishlistsWrapper}>
          <div className={styles.wishlist}>
            <div>
              <div>
                <NextImage
                  src="/birthday-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
              </div>
              <h4>Födelsedag</h4>
            </div>
            <Icon src="/arrowIcon.svg" altText="Icon" />
          </div>

          <div className={styles.wishlist}>
            <div>
              <div>
                <NextImage
                  src="/wedding-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
              </div>
              <h4>Bröllopsdag</h4>
            </div>
            <Icon src="/arrowIcon.svg" altText="Icon" />
          </div>

          <div className={styles.wishlist}>
            <div>
              <div>
                <NextImage
                  src="/christmas-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
              </div>
              <h4>Jul</h4>
            </div>
            <Icon src="/arrowIcon.svg" altText="Icon" />
          </div>
        </div>
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
  const id = context.params.uid;

  const users = [];
  const detailsUser = [];
  const q = query(collection(db, 'users'));

  const querySnapshot = await getDocs(q);

  querySnapshot.docs.map((doc) => users.push({ ...doc.data() }));

  const queryUser = users.find((user) => user.uid === id);

  const details = doc(db, 'usersDetails', id);

  await getDoc(details).then((snapshot) => {
    detailsUser.push({ ...snapshot.data() });
  });

  return {
    props: {
      queryUser,
      detailsUser,
      fallback: false,
    },
  };
};
