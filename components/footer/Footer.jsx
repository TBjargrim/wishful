import Icon from '../shared/Icon';
import Link from 'next/link';
import styles from './_footer.module.scss';

const Footer = () => {
  return (
    <section className={styles.footerContainer}>
      <div className={styles.leftColumn}>
        <Icon src="/logo_2.svg" alttext="logo" width="100" height="30" />
        <h5>Kontakta oss</h5>
        <div className={styles.contactInfo}>
          <Icon src="/phoneIcon.svg" alttext="Icon" />
          <p>+467 1234 56 78</p>
        </div>
        <div className={styles.contactInfo}>
          <Icon src="/mailIcon.svg" alttext="Icon" />
          <p>wishful@wishful.se</p>
        </div>
        <div className={styles.balloonsImageLeft}>
          <Icon
            src="/balloons1.svg"
            alttext="Balloons"
            width="200"
            height="150"
          />
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.leftName}>
          <h5>Sandra Persson</h5>
          <div className={styles.contactInfo}>
            <Icon src="/githubIcon.svg" alttext="Icon" />
            <p>github.se/sandrapersson149</p>
          </div>

          <div className={styles.contactInfo}>
            <Icon src="/linkedinIcon.svg" alttext="Icon" />
            <p>linkedin.com</p>
          </div>

          <div className={styles.contactInfo}>
            <Icon src="/mailIcon.svg" alttext="Icon" />
            <p>sandrapersson.dev@gmail.com</p>
          </div>
        </div>

        <div>
          <h5>Therese Bjärgrim</h5>
          <div className={styles.contactInfo}>
            <Icon src="/githubIcon.svg" alttext="Icon" />
            <p>github.se/tbjargrim</p>
          </div>

          <div className={styles.contactInfo}>
            <Icon src="/linkedinIcon.svg" alttext="Icon" />
            <p>linkedin.com</p>
          </div>

          <div className={styles.contactInfo}>
            <Icon src="/mailIcon.svg" alttext="Icon" />
            <p>tbjargrim@gmail.com</p>
          </div>
        </div>
        <div className={styles.balloonsImageRight}>
          <Icon
            src="/balloons1.svg"
            alttext="Balloons"
            width="250"
            height="180"
          />
        </div>
      </div>
    </section>
  );
};

export default Footer;
