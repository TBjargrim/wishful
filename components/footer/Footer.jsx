import Icon from '../shared/Icon';
import Link from 'next/link';
import styles from './_footer.module.scss';

const Footer = () => {
  return (
    <section className={styles.footerContainer}>
      <div className={styles.leftColumn}>
        <Icon
          src="/logo_2.svg"
          alttext="Wishful logo"
          width="100"
          height="30"
        />
        <h5>Kontakta oss</h5>
        <div className={styles.contactInfoWishful}>
          <Icon src="/phoneIcon.svg" alttext="phoneIcon" />
          <p>+467 1234 56 78</p>
        </div>
        <div className={styles.contactInfoWishful}>
          <Icon src="/mailIcon.svg" alttext="mailIcon" />
          <p>wishful@wishful.se</p>
        </div>
        <div className={styles.balloonsImageLeft}>
          <Icon
            src="/balloons1.svg"
            alttext="Balloons image for footer"
            width="200"
            height="150"
          />
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.nameDetailsWrapper}>
          <h5>Sandra Persson</h5>
          <div className={styles.iconWrapper}>
            <div className={styles.contactInfo}>
              <Link href="https://github.com/sandrapersson149">
                <a target="_blank">
                  <Icon src="/githubIcon.svg" alttext="githubIcon" />
                  <p>github.se/sandrapersson149</p>
                </a>
              </Link>
            </div>

            <div className={styles.contactInfo}>
              <Link href="https://www.linkedin.com/in/sandra-persson-660b551b5/">
                <a target="_blank">
                  <Icon src="/linkedinIcon.svg" alttext="linkedinIcon" />
                  <p>linkedin.com</p>
                </a>
              </Link>
            </div>

            <div className={styles.contactInfo}>
              <Link href="mailto:sandrapersson.dev@gmail.com">
                <a target="_blank">
                  <Icon src="/mailIcon.svg" alttext="mailIcon" />
                  <p>sandrapersson.dev@gmail.com</p>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.nameDetailsWrapper}>
          <h5>Therese Bjärgrim</h5>
          <div className={styles.iconWrapper}>
            <div className={styles.contactInfo}>
              <Link href="https://github.com/tbjargrim">
                <a target="_blank">
                  <Icon src="/githubIcon.svg" alttext="githubIcon" />
                  <p>github.se/tbjargrim</p>
                </a>
              </Link>
            </div>

            <div className={styles.contactInfo}>
              <Link href="https://www.linkedin.com/in/tbjargrim/">
                <a target="_blank">
                  <Icon src="/linkedinIcon.svg" alttext="linkedinIcon" />
                  <p>linkedin.com</p>
                </a>
              </Link>
            </div>

            <div className={styles.contactInfo}>
              <Link href="mailto:t.bjargrim@gmail.com">
                <a target="_blank">
                  <Icon src="/mailIcon.svg" alttext="mailIcon" />
                  <p>t.bjargrim@gmail.com</p>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.balloonsImageRight}>
          <Icon
            src="/balloons1.svg"
            alttext="Balloons image for footer"
            width="250"
            height="180"
          />
        </div>
      </div>
    </section>
  );
};

export default Footer;
