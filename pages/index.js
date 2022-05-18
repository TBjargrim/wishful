import Icon from '../components/shared/Icon';
import styles from '../styles/_landing.module.scss';
import Button from '../components/shared/button/Button';
import Router from 'next/router';

const LandingPage = () => {
  return (
    <div className={styles.landingWrapper}>
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.presentsImgWrapper}>
            <Icon
              src="/landingImage.svg"
              altText="Wrapped gifts"
              width="200"
              height="200"
            />
          </div>
          <h2>
            Kom aldrig mer tomhänt till ett kalas med hjälp av
            <span> Wishful</span>
          </h2>
          <p>
            Har du nånsin kommit tomhänt till ett kalas för att du glömt köpa
            present i tid? Vi kan hjälpa dig!
          </p>
        </div>
        <div>
          <Button onClick={() => Router.push('logga-in')}>Logga in</Button>
          <Button onClick={() => Router.push('skapa-konto')}>
            Skapa konto
          </Button>
        </div>
      </div>

      <div className={styles.cardsSection}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <Icon
              src="/alarmClock.svg"
              altText="logo"
              width="120"
              height="52"
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
              width="120"
              height="50"
            />
          </div>
          <h5>Var förberedd</h5>
          <p>Kom aldrig mer tomhänt till ett event</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <Icon src="/notes.svg" altText="logo" width="120" height="50" />
          </div>
          <h5>Skapa önskelistor</h5>
          <p>Visa dina nära och kära vad du önskar dig</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
