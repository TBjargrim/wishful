import { useState, useEffect } from 'react';
import Button from '../components/shared/button/Button';
import Icon from '../components/shared/Icon';
import styles from '../styles/_accountSettings.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { colRefUserDetails, db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { changedDate } from '../components/helperFunctions';
import { setAllData } from '../components/helperFunctions';

import {
  setDoc,
  doc,
  updateDoc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore';
import AnimateHeight from 'react-animate-height';

const Settings = ({
  setName,
  addedDates,
  setAddedDates,
  collectedInformation,
  setCollectedInformation,
  setUsersFollow,
  setAllWishlists,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [height, setHeight] = useState(0);
  const [addedDate, setAddedDate] = useState({});

  useEffect(() => {
    setAllData(
      user,
      setCollectedInformation,
      addedDates,
      setUsersFollow,
      setAllWishlists
    );
  }, []);

  useEffect(() => {
    setCollectedInformation({ ...collectedInformation, addedDates });
  }, [addedDates]);

  useEffect(() => {
    if (collectedInformation.myInterests !== undefined) {
      const interest = collectedInformation.myInterests;
      const arrInterests = interest.split(',');
      setCollectedInformation({ ...collectedInformation, arrInterests });
    }
  }, [collectedInformation.myInterests]);

  const handleSubmit = (e, path) => {
    e.preventDefault();

    let updatedBirthdate = changedDate(collectedInformation.birthdate);
    setCollectedInformation({
      ...collectedInformation,
      updatedBirthdate: updatedBirthdate,
    });

    setCollectedInformation({ ...collectedInformation, name });

    const docRef = doc(db, 'usersDetails', user.uid);

    getDocs(colRefUserDetails).then((snapshot) => {
      let userDetails = [];
      snapshot.docs.forEach((doc) => {
        userDetails.push({ ...doc.data(), uid: doc.uid });
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

    /*     router.push(path); */
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.name === 'birthdate') {
      const updatedBirthdate = changedDate(e.target.value);

      setCollectedInformation({
        ...collectedInformation,
        [e.target.name]: e.target.value,
        updatedBirthdate: updatedBirthdate,
      });
    } else {
      setCollectedInformation({
        ...collectedInformation,

        [e.target.name]: e.target.value,
      });
    }
  };

  const onValueChange = (e) => {
    const weddingDayIcon = '/wedding-circle.svg';
    const yearDayIcon = '/confetti-circle.svg';
    const otherIcon = '/flowers-circle.svg';

    setAddedDate({
      ...addedDate,
      selected: e.target.value,
      icon: otherIcon,
    });

    if (e.target.value === 'Bröllopsdag') {
      setAddedDate({
        ...addedDate,
        selected: e.target.value,
        icon: weddingDayIcon,
      });
    } else if (e.target.value === 'Årsdag') {
      setAddedDate({
        ...addedDate,
        selected: e.target.value,
        icon: yearDayIcon,
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

    const updatedDate = changedDate(addedDate.date);

    setAddedDates([
      ...addedDates,
      (addedDate = { ...addedDate, updatedDate: updatedDate }),
    ]);
  };

  const handleRemove = (e, i) => {
    e.preventDefault();
    const newDates = [...addedDates.slice(0, i), ...addedDates.slice(i + 1)];
    setAddedDates(newDates);
  };
  console.log(collectedInformation);
  return (
    <div className={styles.settingWrapper}>
      <h3>Fyll i din profil</h3>
      <p>Den här informationen kommer vara synlig på din sida</p>

      <form onSubmit={(e) => handleSubmit(e, '/min-profil')}>
        <div className={styles.topSection}>
          <div className={styles.fields}>
            <div className={styles.userAvatar}>
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
                  placeholder="klistra in länk till en bild här"
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}
            <label htmlFor="name">Användarnamn</label>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Användarnamn"
              value={collectedInformation.name}
              onChange={(e) => handleChange(e)}
            />
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
                  placeholder="ex. 1990-01-01"
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}

            {collectedInformation.addedDates !== undefined &&
              collectedInformation.addedDates.map((addDate, i) => (
                <div key={i} className={styles.newDateWrapper}>
                  <div className={styles.dateWrapper}>
                    <label htmlFor={addDate.selected}>{addDate.selected}</label>
                    <input
                      placeholder="ex. 1990-01-01"
                      id={addDate.selected}
                      type="text"
                      value={addDate.date}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <button onClick={(e) => handleRemove(e, i)}>x</button>
                </div>
              ))}

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
                    <label className={styles.dateLabel} htmlFor="date">
                      Datum
                    </label>
                    <input
                      id="date"
                      type="num"
                      placeholder="ex. 2021-08-10"
                      value={addedDate.date}
                      onChange={addedDateChange}
                    />
                    <button onClick={(e) => addSelectedDate(e)}>Klar!</button>
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
                    placeholder=" Berätta något om dig själv..."
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
        <a className={styles.closeButton}>
          <Button type="transparent">Stäng</Button>
        </a>
      </Link>
    </div>
  );
};

export default Settings;
