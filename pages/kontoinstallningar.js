import { useState } from 'react';
import Button from '../components/shared/button/Button';
import Icon from '../components/shared/Icon';
import styles from '../styles/_accountSettings.module.scss';
import Link from 'next/link';
import WriteToCloudFirestore from '../components/firestore/Write';
import { useRouter } from 'next/router';

const Settings = () => {
  const [profileImage, setProfileImage] = useState('');
  const [birthdate, setBirthdate] = useState();
  const [myInterests, setMyInterests] = useState([]);
  const [description, setDescription] = useState('');

  const [collectedInformation, setCollectedInformation] = useState({});

  const router = useRouter();

  const redirect = (path) => {
    setCollectedInformation({
      ...collectedInformation,
      profileImage,
      birthdate,
      myInterests,
      description,
    });
    router.push(path);
  };

  console.log(collectedInformation);

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
          <WriteToCloudFirestore type="secondary">
            Bekräfta
          </WriteToCloudFirestore>
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
