import { useEffect, useState, useRef } from 'react';
import styles from '../styles/_profile.module.scss';
import Button from '../components/shared/button/Button';
import Link from 'next/link';
import NextImage from 'next/image';
import { db } from '../firebase/config';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import MyWishLists from '../components/myWishists/MyWishLists';
import { useAuth } from '../context/AuthContext';
import { setAllData } from '../components/helperFunctions';

const Profile = ({
  allWishlists,
  setAllWishlists,
  addedDates,
  setUsersFollow,
  collectedInformation,
  setCollectedInformation,
}) => {
  const [newWishlist, setNewWishlist] = useState({
    uid: '',
    listName: '',
    categorie: '',
    icon: '',
    items: [],
  });
  const { user } = useAuth();
  const didMount = useRef(false);

  useEffect(() => {
    setAllData(
      user,
      setCollectedInformation,
      addedDates,
      setUsersFollow,
      setAllWishlists
    );
  }, [user]);

  useEffect(() => {
    if (didMount.current) {
      const docRef = doc(db, 'wishlist', user.uid);

      updateDoc(docRef, {
        wishlist: [...allWishlists],
      });
    } else didMount.current = true;
  }, [allWishlists]);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfoContainer}>
        <div className={styles.topSection}>
          <NextImage src="/avatar_1.svg" alt="logo" width="150" height="150" />

          {collectedInformation && (
            <>
              <h5>{collectedInformation.name}</h5>
              <p>{collectedInformation.description}</p>
            </>
          )}
        </div>

        <div>
          <div className={styles.muiddleSection}>
            {collectedInformation && collectedInformation.birthdate !== '' ? (
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
                  <h5>{collectedInformation.updatedBirthdate}</h5>
                  <p>Födelsedag</p>
                </div>
              </div>
            ) : (
              <></>
            )}

            {collectedInformation &&
            collectedInformation.addedDates !== undefined ? (
              collectedInformation.addedDates.map(
                ({ icon, updatedDate, selected }, i) => (
                  <div key={i} className={styles.dateCard}>
                    <div>
                      <NextImage src={icon} alt="logo" width="35" height="35" />
                    </div>
                    <div>
                      <h5>{updatedDate}</h5>
                      <p>{selected}</p>
                    </div>
                  </div>
                )
              )
            ) : (
              <></>
            )}
          </div>
          <div className={styles.bottomSection}>
            <h3>Mina intressen</h3>

            {collectedInformation.arrInterests ? (
              collectedInformation.arrInterests.map((interest, i) => (
                <div key={i} className={styles.interestsCards}>
                  <p>{interest}</p>
                </div>
              ))
            ) : (
              <div></div>
            )}
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
