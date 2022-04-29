import { useState, useEffect } from 'react';
import Button from '../components/shared/button/Button';
import Icon from '../components/shared/Icon';
import styles from '../styles/_accountSettings.module.scss';
import Link from 'next/link';
import WriteToCloudFirestore from '../components/firestore/Write';
import { useRouter } from 'next/router';
import AnimateHeight from 'react-animate-height';

const Settings = () => {
  const router = useRouter();

  const [height, setHeight] = useState(0);
  const [profileImage, setProfileImage] = useState('');
  const [birthdate, setBirthdate] = useState();
  const [myInterests, setMyInterests] = useState([]);
  const [description, setDescription] = useState('');
  const [addedDates, setAddedDates] = useState([]);
  const [selected, setSelected] = useState('');
  const [newDate, setNewDate] = useState();
  const [showDate, setShowDate] = useState(false);
  const [collectedInformation, setCollectedInformation] = useState({});

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
      addedDates,
    });
  }, [profileImage, birthdate, myInterests, description, addedDates]);

  const onValueChange = (e) => {
    setSelected(e.target.value);
  };

  const addSelectedDate = (e) => {
    e.preventDefault();
    setShowDate(true);
    if (selected || newDate.date) {
      setAddedDates({ selected, ...newDate });
    }
  };

  let labelMonths = [
    'Jan',
    'Feb',
    'Mars',
    'April',
    'Maj',
    'Juni',
    'Juli',
    'Aug',
    'Sept',
    'Okt',
    'Nov',
    'Dec',
  ];
  let testDate = 19930207;

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
              placeholder="ex. www.nånting.se"
              onChange={(e) => setProfileImage(e.target.value)}
            />

            <label htmlFor="interests">Mina intressen</label>
            <input
              id="interests"
              type="text"
              placeholder="ex. Matlagning, Trädgårdsarbete"
              value={myInterests}
              onChange={(e) => setMyInterests(e.target.value)}
            />

            <label htmlFor="date">Födelsedatum</label>
            <input
              id="date"
              type="num"
              value={birthdate}
              placeholder="ex. 890101"
              onChange={(e) => setBirthdate(e.target.value)}
            />

            {showDate ? (
              <>
                <label htmlFor="date">{selected}</label>
                <input
                  id="date"
                  type="num"
                  value={addedDates.date}
                  placeholder="ex. 890101"
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </>
            ) : null}

            <div className={styles.addNewDateWrapper}>
              <h4 onClick={() => setHeight(height === 0 ? 'auto' : 0)}>
                Lägg till ett datum +
              </h4>

              <AnimateHeight id="panel" duration={500} height={height}>
                <div className={styles.newDateContainer}>
                  <div className={styles.categorieWrapper}>
                    <h5>Välj kategori</h5>
                    <div className={styles.radioButtons}>
                      <div>
                        <input
                          type="radio"
                          value="Bröllopsdag"
                          name="kategori"
                          onChange={onValueChange}
                        />
                        <label>Bröllopsdag</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value="Årsdag"
                          name="kategori"
                          onChange={onValueChange}
                        />
                        <label>Årsdag</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value="Övrigt"
                          name="kategori"
                          onChange={onValueChange}
                        />
                        <label>Övrigt</label>
                      </div>
                    </div>
                  </div>

                  <div className={styles.dateWrapper}>
                    <label htmlFor="date">Datum</label>
                    <input
                      id="date"
                      type="num"
                      placeholder="ex. 220101"
                      onChange={(e) =>
                        setNewDate({ ...newDate, date: e.target.value })
                      }
                    />
                    <button onClick={addSelectedDate}>Lägg till</button>
                  </div>
                </div>
              </AnimateHeight>
            </div>
          </div>

          <div className={styles.fields}>
            <div className={styles.descriptionWrapper}>
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
