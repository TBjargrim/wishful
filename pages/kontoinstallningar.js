import Button from '../components/shared/button/Button';
import Icon from '../components/shared/Icon';
import styles from '../styles/_accountSettings.module.scss';
import Link from 'next/link';

const Settings = () => {
  return (
    <div className={styles.settingWrapper}>
      <h3>Fyll i din profil</h3>
      <p>Den här informationen kommer vara synlig på din sida</p>

      <form>
        <div className={styles.icon}>
          <Icon src="/avatar_1.svg" alt="logo" width="70" height="70" />
        </div>

        <div className={styles.topSection}>
          <div className={styles.fields}>
            <label htmlFor="name">Användarnamn</label>
            <input id="name" type="text" placeholder="Användarnamn" />
            <label htmlFor="date">Födelsedatum</label>
            <input id="date" type="num" placeholder="890101" />
            <label htmlFor="interests">Mina intressen</label>
            <input
              id="interests"
              type="text"
              placeholder="Matlagning, Trädgårdsarbete, Vandring"
            />

            <div className={styles.passwordFields}>
              <div className={styles.field}>
                <label htmlFor="password">Lösenord</label>
                <input id="password" type="password" placeholder="*****" />
              </div>
              <div className={styles.field}>
                <label htmlFor="updatePassword">Upprepa lösenord</label>
                <input
                  id="updatePassword"
                  type="password"
                  placeholder="*****"
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
            />
          </div>
        </div>

        <div className={styles.button}>
          <Link href={'/min-profil'} passHref>
            <a>
              <Button>Bekräfta</Button>
            </a>
          </Link>
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
