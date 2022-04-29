import styles from '../styles/_profile.module.scss';
import Button from '../components/shared/button/Button';
import Link from 'next/link';
import NextImage from 'next/image';
import Icon from '../components/shared/Icon';

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.userInfoContainer}>
        <div className={styles.topSection}>
          <NextImage src="/avatar_1.svg" alt="logo" width="150" height="150" />
          <h5>Therese</h5>
          <p>Beskrivning om mig!</p>
        </div>
        <div className={styles.middleSection}>
          <div className={styles.dateCard}>
            <div>
              <NextImage
                src="/birthday-circle.svg"
                alt="logo"
                width="35"
                height="35"
              />
            </div>
            <div>
              <h5>7 Februari</h5>
              <p>Födelsedag</p>
            </div>
          </div>

          <div className={styles.dateCard}>
            <div>
              <NextImage
                src="/confetti-circle.svg"
                alt="logo"
                width="35"
                height="35"
              />
            </div>
            <div>
              <h5>14 maj</h5>
              <p>Årsdag</p>
            </div>
          </div>

          <div className={styles.dateCard}>
            <div>
              <NextImage
                src="/wedding-circle.svg"
                alt="logo"
                width="35"
                height="35"
              />
            </div>
            <div>
              <h5>7 juni</h5>
              <p>Bröllopsdag</p>
            </div>
          </div>

          <div className={styles.bottomSection}>
            <h3>Mina intressen</h3>

            <div className={styles.interestsCards}>
              <p>Baka</p>
            </div>
          </div>
        </div>

        <div className={styles.editButton}>
          <Link href={'/kontoinstallningar'} passHref>
            <a>
              <Button type="primary">Redigera info</Button>
            </a>
          </Link>
        </div>
      </div>

      <div className={styles.wishlistContainer}>
        <div>
          <h3>Mina önskelistor</h3>
          <a>
            <Button type="default">Skapa ny lista +</Button>
          </a>
        </div>
        <div className={styles.wishlistsWrapper}>
          <div className={styles.wishlist}>
            <div>
              <div>
                <NextImage
                  src="/birthday-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
              </div>
              <h4>Födelsedag</h4>
            </div>
            <Icon src="/arrowIcon.svg" altText="Icon" />
          </div>

          <div className={styles.wishlist}>
            <div>
              <div>
                <NextImage
                  src="/wedding-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
              </div>
              <h4>Bröllopsdag</h4>
            </div>
            <Icon src="/arrowIcon.svg" altText="Icon" />
          </div>

          <div className={styles.wishlist}>
            <div>
              <div>
                <NextImage
                  src="/christmas-circle.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
              </div>
              <h4>Jul</h4>
            </div>
            <Icon src="/arrowIcon.svg" altText="Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
