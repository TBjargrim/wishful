import { useEffect, useState } from 'react';
import styles from '../styles/_profile.module.scss';
import Button from '../components/shared/button/Button';
import Link from 'next/link';
import NextImage from 'next/image';
import Icon from '../components/shared/Icon';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

const Profile = ({ user }) => {
  const [myInfo, setMyInfo] = useState({});
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'usersDetails', user.uid);

      onSnapshot(docRef, (doc) => {
        if (doc.data() !== undefined) {
          setMyInfo({ ...doc.data() });
          console.log('data from firestore');
        } else {
          const savedObj = JSON.parse(
            localStorage.getItem('collectedInformation')
          );
          setMyInfo(savedObj);
          console.log('data from localStorage');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, 'usersDetails', user.uid);

      onSnapshot(docRef, (doc) => {
        if (doc.data() !== undefined) {
          setMyInfo({ ...doc.data() });
          console.log('data from firestore');
        } else {
          const savedObj = JSON.parse(
            localStorage.getItem('collectedInformation')
          );
          setMyInfo(savedObj);
          console.log('data from localStorage');
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
  console.log(interests);
  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfoContainer}>
        <div className={styles.topSection}>
          <NextImage src="/avatar_1.svg" alt="logo" width="150" height="150" />

          {user && (
            <>
              <h5>{user.displayName}</h5>
              <p>{user.email}</p>
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
                  <h5>{myInfo.birthdate}</h5>
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
                  <h5>{dates.date}</h5>
                  <p>{dates.selected}</p>
                </div>
              </div>
            ))}

          <div className={styles.bottomSection}>
            <h3>Mina intressen</h3>
            {interests &&
              interests.map((interest) => (
                <div className={styles.interestsCards}>
                  <p>{interest}</p>
                </div>
              ))}
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

      <div className={styles.wishlistContainer}>
        <div>
          <h3>Mina önskelistor</h3>
          <a>
            <Button type="default">Skapa ny lista +</Button>
          </a>
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

export default Profile;
