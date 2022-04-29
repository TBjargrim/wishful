import { useState, useEffect } from 'react';
import Button from '../components/shared/button/Button';
import Icon from '../components/shared/Icon';
import styles from '../styles/_accountSettings.module.scss';
import Link from 'next/link';
import WriteToCloudFirestore from '../components/firestore/Write';
import { useRouter } from 'next/router';
import AnimateHeight from 'react-animate-height';

const Settings = () => {
  const [height, setHeight] = useState(0);
  const [profileImage, setProfileImage] = useState('');
  const [birthdate, setBirthdate] = useState();
  const [myInterests, setMyInterests] = useState([]);
  const [description, setDescription] = useState('');
  const [optionalDates, setOptionalDates] = useState([]);
  const [optionalDate, setOptionalDate] = useState({});
  const [selected, setSelected] = useState('');
  const [collectedInformation, setCollectedInformation] = useState({});

  const router = useRouter();

  const redirect = (path) => {
    router.push(path);
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

  const onValueChange = (e) => {
    setSelected(e.target.value);
  };

  const addSelectedDate = (e) => {
    e.preventDefault();
    if (selected || optionalDate.date) {
      setOptionalDates({ ...optionalDate });
    }
  };
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

            {optionalDates && <p>Added date goes here</p>}
            <div>
              <h3 onClick={() => setHeight(height === 0 ? 'auto' : 0)}>
                Lägg till ett datum +
              </h3>
              <AnimateHeight id="panel" duration={500} height={height}>
                <div>
                  <h5>Välj kategori</h5>
                  <div className="radio-buttons">
                    <label>Bröllopsdag</label>
                    <input
                      type="radio"
                      value="Bröllopsdag"
                      name="kategori"
                      onChange={onValueChange}
                    />
                    <label>Årsdag</label>
                    <input
                      type="radio"
                      value="Årsdag"
                      name="kategori"
                      onChange={onValueChange}
                    />
                    <label>Övrigt</label>
                    <input
                      type="radio"
                      value="Övrigt"
                      name="kategori"
                      onChange={onValueChange}
                    />
                  </div>
                </div>
                <label htmlFor="date">Datum för {selected}</label>
                <input
                  id="date"
                  type="num"
                  placeholder="ex. 220101"
                  onChange={(e) =>
                    setOptionalDate({ ...optionalDate, date: e.target.value })
                  }
                />
                <button onClick={addSelectedDate}>Lägg till</button>
              </AnimateHeight>
            </div>
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
          <WriteToCloudFirestore
            type="secondary"
            collectedInformation={collectedInformation}
          >
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
