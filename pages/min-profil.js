import { useEffect, useState } from 'react';
import styles from '../styles/_profile.module.scss';
import Button from '../components/shared/button/Button';
import Link from 'next/link';
import NextImage from 'next/image';
import { db } from '../firebase/config';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import MyWishLists from '../components/myWishists/MyWishLists';

const Profile = ({
  user,
  interests,
  setInterests,
  allWishlists,
  setAllWishlists,
}) => {
  const [myInfo, setMyInfo] = useState({});

  const [newWishlist, setNewWishlist] = useState({
    id: '',
    listName: '',
    categorie: '',
    icon: '/birthday-circle.svg',
    items: [],
  });

  useEffect(() => {
    if (user) {
      let docRef = doc(db, 'usersDetails', user.uid);

      onSnapshot(docRef, (doc) => {
        if (doc.data() !== undefined) {
          setMyInfo({ ...doc.data() });
        } else {
          const savedObj = JSON.parse(
            localStorage.getItem('collectedInformation')
          );
          setMyInfo(savedObj);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      const docRefWishList = doc(db, 'wishlist', user.uid);

      updateDoc(docRefWishList, {
        wishlist: [...allWishlists],
      });
    }
  }, [allWishlists]);

  useEffect(() => {
    if (user) {
      let docRef = doc(db, 'usersDetails', user.uid);

      onSnapshot(docRef, (doc) => {
        if (doc.data() !== undefined) {
          setMyInfo({ ...doc.data() });
        } else {
          const savedObj = JSON.parse(
            localStorage.getItem('collectedInformation')
          );
          setMyInfo(savedObj);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (myInfo.myInterests !== undefined) {
      const interests = myInfo.myInterests;
      const arrInterests = interests.split(',');
      setInterests(arrInterests);
    }
  }, [myInfo]);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfoContainer}>
        <div className={styles.topSection}>
          <NextImage src="/avatar_1.svg" alt="logo" width="150" height="150" />

          {user && (
            <>
              <h5>{user.displayName}</h5>
              {/* <p>{user.email}</p> */}
              {myInfo && <p>{myInfo.description}</p>}
            </>
          )}
        </div>

        <div>
          {myInfo.birthdate !== '' ? (
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
                  <h5>{myInfo.updatedBirthdate}</h5>
                  <p>Födelsedag</p>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {myInfo.addedDates &&
            myInfo.addedDates.map((dates) => (
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
            ))}

          <div className={styles.bottomSection}>
            <h3>Mina intressen</h3>
            <div className={styles.interestsCards}>
              {interests && interests.map((interest) => <p>{interest}</p>)}
            </div>
          </div>

          <div className={styles.editButton}>
            <Link href={'/kontoinstallningar'} passHref>
              <a>
                <Button type="primary">Redigera info</Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <MyWishLists
        newWishlist={newWishlist}
        setNewWishlist={setNewWishlist}
        allWishlists={allWishlists}
        setAllWishlists={setAllWishlists}
      />
    </div>
  );
};

export default Profile;
