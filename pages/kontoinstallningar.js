import { useState, useEffect } from 'react';
import Button from '../components/shared/button/Button';
import Icon from '../components/shared/Icon';
import styles from '../styles/_accountSettings.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { colRefUserDetails, db } from '../firebase/config';
import { setDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

const Settings = ({ user }) => {
  const [profileImage, setProfileImage] = useState('');
  const [birthdate, setBirthdate] = useState();
  const [myInterests, setMyInterests] = useState([]);
  const [description, setDescription] = useState('');

  const [collectedInformation, setCollectedInformation] = useState({});

  const router = useRouter();

  const redirect = (path) => {
    router.push(path);
    changes();
  };

  const changes = async () => {
    const docRef = doc(db, 'usersDetails', user.uid);

    getDocs(colRefUserDetails).then((snapshot) => {
      let userDetails = [];
      snapshot.docs.forEach((doc) => {
        userDetails.push({ ...doc.data(), id: doc.id });
      });

      if (userDetails.length !== 0) {
        userDetails.map((details) => {
          if (details.uid) {
            updateDoc(docRef, {
              collectedInformation,
              uid: user.uid,
              name: user.displayName,
            });
          } else {
            setDoc(docRef, {
              collectedInformation,
              uid: user.uid,
              name: user.displayName,
            });
          }
        });
      } else {
        setDoc(docRef, {
          collectedInformation,
          uid: user.uid,
          name: user.displayName,
        });
      }
    });

    /*      .then(); */
  };

  useEffect(() => {
    setCollectedInformation({
      ...collectedInformation,
      profileImage,
      birthdate,
      myInterests,
      description,
    });
  }, [profileImage, birthdate, myInterests, description]);

  return (
    <div className={styles.settingWrapper}>
      <h3>Fyll i din profil</h3>
      <p>Den här informationen kommer vara synlig på din sida</p>

      <form>
        <div className={styles.topSection}>
          <div className={styles.fields}>
            <div className={styles.icon}>
              <Icon src="/avatar_1.svg" alt="logo" width="70" height="70" />
            </div>

            <label htmlFor="date">Lägg till länk till profilbild</label>
            <input
              id="profileURL"
              type="text"
              value={profileImage}
              placeholder="ex. url www.nånting.se"
              onChange={(e) => setProfileImage(e.target.value)}
            />

            <label htmlFor="date">Födelsedatum</label>
            <input
              id="date"
              type="num"
              value={birthdate}
              placeholder="ex. 890101"
              onChange={(e) => setBirthdate(e.target.value)}
            />

            <label htmlFor="interests">Mina intressen</label>
            <input
              id="interests"
              type="text"
              placeholder="ex. Matlagning, Trädgårdsarbete"
              value={myInterests}
              onChange={(e) => setMyInterests(e.target.value)}
            />

            <div className={styles.passwordFields}>
              <div className={styles.field}>
                <label htmlFor="password">Lösenord</label>
                <input id="password" type="password" placeholder="********" />
              </div>
              <div className={styles.field}>
                <label htmlFor="updatePassword">Upprepa lösenord</label>
                <input
                  id="updatePassword"
                  type="password"
                  placeholder="********"
                />
              </div>
            </div>
          </div>

          <div className={styles.fields}>
            <label htmlFor="descriptionText">
              Skriv en beskrivning om dig själv:
            </label>
            <textarea
              id="decriptionText"
              name="description"
              placeholder="Beskrivning ..."
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.button} onClick={() => redirect('/min-profil')}>
          {/*           <WriteToCloudFirestore
            type="secondary"
            collectedInformation={collectedInformation}
          > */}
          Bekräfta
          {/*      </WriteToCloudFirestore> */}
        </div>
      </form>

      <Link href={'/min-profil'} passHref>
        <a>
          <Button type="transparent">Stäng</Button>
        </a>
      </Link>
    </div>
  );
};

export default Settings;
