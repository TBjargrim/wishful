import { useEffect, useState, useRef } from 'react';
import styles from '../styles/_profile.module.scss';
import Button from '../components/shared/button/Button';
import Header from '../components/shared/Header';
import Link from 'next/link';
import NextImage from 'next/image';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
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
    id: '',
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
    <>
      <Header children="Min Profilsida " />
      <div className={styles.profileContainer}>
        <div className={styles.userInfoContainer}>
          <div className={styles.topSection}>
            {collectedInformation && (
              <>
                {collectedInformation.profileImage !== '' ? (
                  <div className={styles.imgWrapper}>
                  <img
                    src={collectedInformation.profileImage}
                    alt="logo"
                    width="90"
                    height="90"
                  />
                  </div>
                ) : (
                  <div className={styles.imgWrapper}>
                  <NextImage
                    src="/profileImage.jpg"
                    alt="avatar"
                    width="55"
                    height="55"
                  />
                  </div>
                )}
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
                      alt="/birthday-circle.svg"
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
                  ({ icon, updatedDate, selected }, index) => (
                    <div key={index} className={styles.dateCard}>
                      <div>
                        <NextImage
                          src={icon}
                          alt={icon}
                          width="35"
                          height="35"
                        />
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
    </>
  );
};

export default Profile;
