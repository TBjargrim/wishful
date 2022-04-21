import styles from '../styles/_homepage.module.scss';
import NextImage from 'next/image';

const Hem = () => {
  
  return (
    <div>
      <div className={styles.homepageContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.searchWrapper}>
            <input placeholder="Sök bland dina vänner"></input>
          </div>
          <div className={styles.eventsWrapper}>
            <div>
              <h3>Denna månad</h3>
            </div>
            <div className={styles.cardWrapper}>
              <div className={styles.eventCard}>
                <div className={styles.cardImg}>
                  <NextImage
                    src="/wedding-circle.svg"
                    alt="logo"
                    width="45"
                    height="45"
                  />
                </div>
                <div>
                  <h4>2 maj</h4>
                  <p>Therese och Bens bröllopsdag</p>
                </div>
              </div>

              <div className={styles.eventCard}>
                <div className={styles.cardImg}>
                  <NextImage
                    src="/birthday-circle.svg"
                    alt="logo"
                    width="45"
                    height="45"
                  />
                </div>
                <div>
                  <h4>8 maj</h4>
                  <p>Sandras födelsedag</p>
                </div>
              </div>

              <div className={styles.eventCard}>
                <div className={styles.cardImg}>
                  <NextImage
                    src="/confetti-circle.svg"
                    alt="logo"
                    width="45"
                    height="45"
                  />
                </div>
                <div>
                  <h4>17 maj</h4>
                  <p>Therese och Bens Bröllopsdag</p>
                </div>
              </div>

              <div className={styles.eventCard}>
                <div className={styles.cardImg}>
                  <NextImage
                    src="/birthday-circle.svg"
                    alt="logo"
                    width="45"
                    height="45"
                  />
                </div>
                <div>
                  <h4>28 maj</h4>
                  <p>Therese och Bens Bröllopsdag</p>
                </div>
              </div>
            </div>
            {/* <div className={styles.emptyMessage}>
              <p>Denna månad är det inga händelser eller event</p>
            </div> */}
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div>
            <h3>Påminnelse</h3>
          </div>
          <div className={styles.reminders}>
            <div className={styles.reminderCard}>
              <div className={styles.cardImg}>
                <NextImage
                  src="/present-circle.svg"
                  alt="logo"
                  width="40"
                  height="40"
                />
              </div>
              <div>
                <h6>Snart fyller Sandra år</h6>
                <p>
                  <span>3 dagar</span> kvar
                </p>
                <a>
                  <button>Se önskelistor</button>
                </a>
              </div>
            </div>

            {/* <div className={styles.emptyMessage}>
              <p>Du har inga påminnelser just nu</p>
            </div> */}
          </div>

          <div className={styles.calender}>
            <h3>Kalender</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hem;
