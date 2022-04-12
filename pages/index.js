import Icon from '../components/shared/Icon';
import Button from '../components/shared/button/Button';
import Link from 'next/link';

import styles from '../styles/_landing.module.scss';

const LandingPage = () => {
  return (
    <div className={styles.landingWrapper}>
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <h2>Kom aldrig mer tomhänt till ett kalas med hjälp av </h2>
          <Icon src="/logo_1.svg" altText="logo" width="200" height="70" />
          <p>
            Har du nånsin kommit tomhänt till ett kalas för att du glömt köpa
            present i tid? <span>Vi kan hjälpa dig!</span>
          </p>
          <div className={styles.buttonSection}>
            <Link href={'/skapa-konto'} passHref>
              <a>
                <Button> Skapa konto</Button>
              </a>
            </Link>
            <Link href={'/logga-in'} passHref>
              <a>
                <Button type="primary">Logga in</Button>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <Icon
            src="/landingImage.svg"
            altText="Wrapped gifts"
            width="400"
            height="400"
          />
        </div>
      </div>

      <div className={styles.cardsSection}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <Icon
              src="/alarmClock.svg"
              altText="logo"
              width="150"
              height="65"
            />
          </div>
          <h5>Få påminnelser</h5>
          <p>Bli påmind i god tid för att inte glömma bort</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <Icon
              src="/wrappedGift.svg"
              altText="logo"
              width="150"
              height="60"
            />
          </div>
          <h5>Var förberedd</h5>
          <p>Kom aldrig mer tomhänt till ett event</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <Icon src="/notes.svg" altText="logo" width="150" height="62" />
          </div>
          <h5>Skapa önskelistor</h5>
          <p>Visa dina nära och kära vad du önskar dig</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
