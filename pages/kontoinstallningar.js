import { useState, useEffect } from 'react';
import Button from '../components/shared/button/Button';
import Icon from '../components/shared/Icon';
import styles from '../styles/_accountSettings.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { colRefUserDetails, db } from '../firebase/config';
import { changedDate } from '../components/helperFunctions';
import {
  setDoc,
  doc,
  updateDoc,
  getDocs,
  connectFirestoreEmulator,
} from 'firebase/firestore';
import { useLocalStorage } from '../components/useLocalStorage';
import AnimateHeight from 'react-animate-height';

const Settings = ({ user }) => {
  const router = useRouter();
  const [height, setHeight] = useState(0);
  const [addedDate, setAddedDate] = useState({});
  const [addedDates, setAddedDates] = useState([]);

  const [collectedInformation, setCollectedInformation] = useLocalStorage(
    'collectedInformation',
    {
      profileImage: '',
      birthdate: '',
      myInterests: '',
      description: '',
      updatedBirthdate: '',
      addedDates,
    }
  );

  const handleSubmit = (e, path) => {
    e.preventDefault();

    changes();

    /*     const arrInterests = collectedInformation.myInterests.split(',');

    const updatedBirthdate = changedDate(collectedInformation.birthdate);

    setCollectedInformation({
      ...collectedInformation,
      arrInterests,
      updatedBirthdate,
      addedDates,
    }); */

    const docRef = doc(db, 'usersDetails', user.uid);

    getDocs(colRefUserDetails).then((snapshot) => {
      let userDetails = [];
      snapshot.docs.forEach((doc) => {
        userDetails.push({ ...doc.data(), id: doc.id });
      });

      if (userDetails.length !== 0) {
        userDetails.map((details) => {
          if (details.uid === user.uid) {
            updateDoc(docRef, {
              ...collectedInformation,
            });
          } else {
            setDoc(docRef, {
              ...collectedInformation,
            });
          }
        });
      } else {
        setDoc(docRef, {
          ...collectedInformation,
        });
      }
    });

    /*      .then(); */

    router.push(path);
  };

  const handleChange = (e) => {
    setCollectedInformation({
      ...collectedInformation,
      [e.target.name]: e.target.value,
    });
  };

  const changes = async () => {
    localStorage.setItem(
      'collectedInformation',
      JSON.stringify(collectedInformation)
    );
  };

  const onValueChange = (e) => {
    const birthdayIcon = '/birthday-circle.svg';
    const weddingDayIcon = '/wedding-circle.svg';
    const yearDayIcon = '/confetti-circle.svg';

    setAddedDate({
      ...addedDate,
      selected: e.target.value,
      icon: birthdayIcon,
      title: user.displayName,
    });

    if (e.target.value === 'Bröllopsdag') {
      setAddedDate({
        ...addedDate,
        selected: e.target.value,
        icon: weddingDayIcon,
        title: user.displayName,
      });
    } else if (e.target.value === 'Årsdag') {
      setAddedDate({
        ...addedDate,
        selected: e.target.value,
        icon: yearDayIcon,
        title: user.displayName,
      });
    }
  };

  const addedDateChange = (e) => {
    setAddedDate({
      ...addedDate,
      date: e.target.value,
    });
  };

  const addSelectedDate = (e) => {
    e.preventDefault();
    /* 
    const updatedDate = changedDate(addedDate.date);

    setAddedDate({ ...addedDate, updatedDate }); */

    setAddedDates([...addedDates, addedDate]);
  };

  const handleRemove = (e, addDate) => {
    e.preventDefault();
    const updatedDates = addedDates.filter((date) => {
      console.log(date.selected);
      date.selected != addDate.selected;
    });
    setAddedDates(updatedDates);
  };

  return (
    <div className={styles.settingWrapper}>
      <h3>Fyll i din profil</h3>
      <p>Den här informationen kommer vara synlig på din sida</p>

      <form onSubmit={(e) => handleSubmit(e, '/min-profil')}>
        <div className={styles.topSection}>
          <div className={styles.fields}>
            <div className={styles.icon}>
              <Icon src="/avatar_1.svg" alt="logo" width="70" height="70" />
            </div>
            {collectedInformation && (
              <>
                <label htmlFor="profileImage">
                  Lägg till länk till profilbild
                </label>
                <input
                  name="profileImage"
                  id="profileImage"
                  type="text"
                  value={collectedInformation.profileImage}
                  placeholder="ex. www.nånting.se"
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}
            {collectedInformation && (
              <>
                <label htmlFor="interests">Mina intressen</label>
                <input
                  name="myInterests"
                  id="interests"
                  type="text"
                  placeholder="ex. Matlagning, Trädgårdsarbete"
                  value={collectedInformation.myInterests}
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}
            {collectedInformation && (
              <>
                <label htmlFor="birthday">Födelsedatum</label>
                <input
                  name="birthdate"
                  id="birthday"
                  type="text"
                  value={collectedInformation.birthdate}
                  placeholder="ex. 890101"
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}

            {/*            {addedDates &&
              collectedInformation.addedDates.map((addDate) => (
                <>
                  <p>{addDate.selected}</p>
                  <p>{addDate.date}</p>
                  <button onClick={(e) => handleRemove(e, addDate)}>x</button>
                </>
              ))} */}

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
                      value={addedDate.newDate}
                      onChange={addedDateChange}
                    />
                    <button onClick={(e) => addSelectedDate(e)}>
                      Lägg till
                    </button>
                  </div>
                </div>
              </AnimateHeight>
            </div>
          </div>

          <div className={styles.fields}>
            {collectedInformation && (
              <>
                <div className={styles.descriptionWrapper}>
                  <label htmlFor="description">
                    Skriv en beskrivning om dig själv:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Beskrivning ..."
                    type="text"
                    value={collectedInformation.description}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </>
            )}
            {collectedInformation && (
              <>
                <div className={styles.passwordFields}>
                  <div className={styles.field}>
                    <label htmlFor="password">Lösenord</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="********"
                    />
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
              </>
            )}
          </div>
        </div>

        <button className={styles.button}>Bekräfta</button>
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
